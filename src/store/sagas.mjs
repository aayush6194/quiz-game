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

    yield put({
        type: VOTE.NEXT_VOTE,
        payload: { roomId },
    });
    yield notifyQuestion(action, roomId);

    const { vote } = yield race({
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
        const [choices, totalPlayers] = yield select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            const questionId = state.questions.allIds[voting];
            return [
                state.rooms.byId[roomId].tallies[questionId],
                state.rooms.byId[roomId].players.length,
            ];
        });
        if (totalVotes(choices) === totalPlayers) {
            yield put({ type: VOTE.NEXT_VOTE, payload: { roomId } });
            yield notifyQuestion(action, roomId);
        }
    } else {
        yield put({ type: VOTE.NEXT_VOTE, payload: { roomId } });
        yield notifyQuestion(action, roomId);
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
