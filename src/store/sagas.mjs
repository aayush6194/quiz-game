import {
    all,
    takeEvery,
    put,
    take,
    race,
    delay,
    select,
    call,
} from 'redux-saga/dist/redux-saga-effects.umd.js';
import udid from 'uuid';
import { ACTIONS as VOTE } from './actions/vote.mjs';
import { ACTIONS as ROOM } from './actions/room.mjs';
import { ACTIONS as PLAYER } from './actions/player.mjs';
import { Player } from '../domains/Player.mjs';

const { v1 } = udid;

const getScoreBoard = ({ players, questions, tallies }) => {
    const scores = {};
    Object.entries(tallies).forEach(([questionId, tally]) => {
        return Object.entries(tally).forEach(([choiceId, playerIds]) => {
            const choice = questions[questionId].choices.find(
                ({ id }) => id === choiceId
            );
            return playerIds.forEach((playerId) => {
                const player = players.find(({ id }) => id === playerId);
                if (!scores[player.id]) {
                    scores[player.id] = {
                        player: {
                            name: player.name,
                        },
                        right: 0,
                        wrong: 0,
                    };
                }
                choice.isAnswer
                    ? scores[player.id].right++
                    : scores[player.id].wrong++;
            });
        });
    });
    return Object.values(scores);
};

const totalVotes = (choices) => {
    if (!choices) {
        return 0;
    }
    return Object.values(choices).reduce((total, players) => {
        return total + players.length;
    }, 0);
};

function* notifyQuestion(action, roomId) {
    const [players, question] = yield all([
        getPlayersInRoom(action.payload.roomId),
        select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            const questionId = state.questions.allIds[voting];
            return state.questions.byId[questionId];
        }),
    ]);
    const questionPayload = JSON.stringify({
        type: VOTE.NEXT_VOTE,
        payload: {
            question,
        },
    });
    yield all(players.map(({ socket }) => socket.send(questionPayload)));
}

function* getPlayersInRoom(roomId) {
    const [players, allPlayers] = yield select((state) => [
        state.rooms.byId[roomId].players,
        state.players.byId,
    ]);
    return players.map((playerId) => allPlayers[playerId]);
}

function* beginVote(action) {
    const roomId = action.payload.roomId;
    let flag = false;

    yield put({
        type: VOTE.NEXT_VOTE,
        payload: { roomId },
    });
    yield notifyQuestion(action, roomId);

    const { vote, timeout } = yield race({
        vote: take('CAST_VOTE'),
        timeout: delay(10_000),
    });
    if (vote) {
        const questionId = yield select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            return state.questions.allIds[voting];
        });
        yield put({
            type: VOTE.ADD_VOTE,
            payload: { ...vote.payload, roomId, questionId },
        });
        const [tallies, totalPlayers] = yield select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            const questionId = state.questions.allIds[voting];
            return [
                state.rooms.byId[roomId].tallies[questionId],
                state.rooms.byId[roomId].players.length,
            ];
        });
        flag = totalVotes(tallies) === totalPlayers;
        if (!flag) {
            const socket = yield select(
                (state) => state.players.byId[action.payload.playerId].socket
            );
            socket.send(
                JSON.stringify({
                    type: 'WAIT_RESULT',
                })
            );
        }
    }
    if (timeout || flag) {
        const players = yield getPlayersInRoom(roomId);
        const result = yield select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            const questionId = state.questions.allIds[voting];
            return state.rooms.byId[roomId].tallies[questionId];
        });
        const resultPayload = JSON.stringify({
            type: 'LOAD_RESULT',
            payload: { result },
        });
        yield all(players.map(({ socket }) => socket.send(resultPayload)));
        yield delay(2_500);
        const [voting, questions, totalQuestions, tallies] = yield select(
            (state) => {
                return [
                    state.rooms.byId[roomId].voting,
                    state.questions.byId,
                    state.questions.allIds.length,
                    state.rooms.byId[roomId].tallies,
                ];
            }
        );
        if (voting === totalQuestions - 1) {
            const finalScore = getScoreBoard({
                players,
                questions,
                tallies,
            });
            const scorePayload = JSON.stringify({
                type: 'LOAD_RESULTS',
                payload: { results: finalScore },
            });
            yield put({ type: ROOM.DESTROY_ROOM, payload: { roomId } });
            yield all(players.map(({ socket }) => socket.send(scorePayload)));
        } else {
            yield put(action);
        }
    }
}

function* voteSaga() {
    yield takeEvery('BEGIN_VOTE', beginVote);
}

function* createRoom(action) {
    const roomId = yield call(v1);
    const { playerId } = action.payload;

    yield put({
        type: ROOM.ADD_ROOM,
        payload: {
            roomId,
        },
    });
    yield put({
        type: ROOM.JOIN_ROOM,
        payload: {
            playerId,
            roomId,
        },
    });

    const [currPlayer, players] = yield all([
        select((state) => state.players.byId[playerId]),
        getPlayersInRoom(roomId),
    ]);
    const serializedPlayers = players.map((player) => player.serialize());

    yield currPlayer.socket.send(
        JSON.stringify({
            type: ROOM.JOIN_ROOM,
            payload: {
                roomId,
            },
        })
    );

    yield all(
        players.map(({ socket }) =>
            socket.send(
                JSON.stringify({
                    type: 'LOAD_PLAYERS',
                    payload: {
                        players: serializedPlayers,
                    },
                })
            )
        )
    );
}

function* roomSaga() {
    yield takeEvery('CREATE_ROOM', createRoom);
}

function* createPlayer(action) {
    const id = yield call(v1);
    const player = Player({
        ...action.payload.player,
        socket: action.payload.socket,
        id,
    });
    yield put({ type: PLAYER.ADD_PLAYER, payload: { player } });

    const { socket, ...rest } = player;
    socket.send(
        JSON.stringify({
            type: 'CREATE_PLAYER',
            payload: { player: rest },
        })
    );
}

function* playerSaga() {
    yield takeEvery('CREATE_PLAYER', createPlayer);
}

export default function* rootSaga() {
    yield all([voteSaga(), roomSaga(), playerSaga()]);
}
