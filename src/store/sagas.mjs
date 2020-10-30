import {
    all,
    takeEvery,
    put,
    delay,
    select,
    call,
    spawn,
} from 'redux-saga/dist/redux-saga-effects.umd.js';
import { v1 } from 'uuid';
import * as WebSocket from 'ws';
import { ACTIONS as VOTE } from './actions/vote';
import { ACTIONS as ROOM } from './actions/room';
import { ACTIONS as PLAYER, PLAYER_STATE } from './actions/player';
import { Player } from '../domains/Player';

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

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
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
            const questionId = state.rooms.byId[roomId].questions[voting];
            const question = state.questions.byId[questionId];
            return question.serialize();
        }),
    ]);
    yield put({
        type: PLAYER.NEXT_STATE,
        payload: {
            playerIds: players.map(({ id }) => ({ id })),
            state: PLAYER_STATE.VOTING,
        },
    });
    const payload = JSON.stringify({
        type: PLAYER.NEXT_STATE,
        payload: {
            question,
            state: PLAYER_STATE.VOTING,
        },
    });
    yield all(
        players
            .filter(({ socket }) => socket.readyState === WebSocket.OPEN)
            .map(({ socket }) => socket.send(payload))
    );
}

function* getPlayersInRoom(roomId) {
    const [playerIds, allPlayers] = yield select((state) => [
        state.rooms.byId[roomId] ? state.rooms.byId[roomId].players : [],
        state.players.byId,
    ]);
    const players = [];
    playerIds.forEach((playerId) => players.push(allPlayers[playerId]));
    return players;
}

function* bgTask({ roomId, questionId, playerId }) {
    yield delay(10_000);
    const currQuestionId = yield select((state) => {
        const voting = state.rooms.byId[roomId]?.voting;
        if (voting === undefined) {
            return undefined;
        }
        return state.rooms.byId[roomId].questions[voting];
    });
    yield put({
        type: 'END_VOTE',
        payload: {
            roomId,
            questionId,
            playerId,
            force: currQuestionId === questionId,
        },
    });
}

function* beginVote(action) {
    const roomId = action.payload.roomId;
    yield put({
        type: VOTE.NEXT_VOTE,
        payload: { roomId },
    });
    yield notifyQuestion(action, roomId);
    const questionId = yield select((state) => {
        const voting = state.rooms.byId[roomId].voting;
        return state.rooms.byId[roomId].questions[voting];
    });
    yield spawn(bgTask, {
        roomId,
        questionId,
        playerId: action.payload.playerId,
    });
}

function* castVote(action) {
    const roomId = action.payload.roomId;
    const questionId = yield select((state) => {
        const voting = state.rooms.byId[roomId].voting;
        return state.rooms.byId[roomId].questions[voting];
    });
    yield put({
        type: VOTE.ADD_VOTE,
        payload: { ...action.payload, roomId, questionId },
    });
    yield put({
        type: 'END_VOTE',
        payload: { roomId, questionId, playerId: action.payload.playerId },
    });
}

function* endVote(action) {
    const { roomId, questionId } = action.payload;
    const currQuestionId = yield select((state) => {
        const voting = state.rooms.byId[roomId]?.voting;
        if (voting === undefined) {
            return undefined;
        }
        return state.rooms.byId[roomId].questions[voting];
    });
    if (currQuestionId === undefined) {
        return;
    }
    if (questionId === currQuestionId || action.payload.force) {
        const [tallies, totalPlayers] = yield select((state) => {
            const voting = state.rooms.byId[roomId].voting;
            const questionId = state.rooms.byId[roomId].questions[voting];
            return [
                state.rooms.byId[roomId].tallies[questionId],
                state.rooms.byId[roomId].players.size,
            ];
        });

        if (totalVotes(tallies) === totalPlayers || action.payload.force) {
            const players = yield getPlayersInRoom(roomId);
            yield put({
                type: PLAYER.NEXT_STATE,
                payload: {
                    playerIds: players.map(({ id }) => ({ id })),
                    state: PLAYER_STATE.ON_RESULT,
                },
            });
            const result = yield select((state) => {
                const voting = state.rooms.byId[roomId].voting;
                const questionId = state.rooms.byId[roomId].questions[voting];
                return [
                    state.rooms.byId[roomId].tallies[questionId] ?? null,
                    state.questions.byId[questionId].serialize(false),
                ];
            });
            const payload = JSON.stringify({
                type: PLAYER.NEXT_STATE,
                payload: {
                    state: PLAYER_STATE.ON_RESULT,
                    result,
                },
            });
            yield all(
                players
                    .filter(
                        ({ socket }) => socket.readyState === WebSocket.OPEN
                    )
                    .map(({ socket }) => socket.send(payload))
            );
            yield delay(3_000);
            const [voting, questions, totalQuestions, tallies] = yield select(
                (state) => {
                    const room = state.rooms.byId[roomId];
                    if (room === undefined) {
                        return [undefined];
                    }
                    return [
                        room.voting,
                        state.questions.byId,
                        state.questions.allIds.length,
                        room.tallies,
                    ];
                }
            );
            if (voting !== undefined) {
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
                    yield all(
                        players.map(({ socket }) => {
                            if (socket.readyState === WebSocket.OPEN) {
                                return socket.send(scorePayload);
                            }
                        })
                    );
                } else {
                    return yield put({
                        type: 'BEGIN_VOTE',
                        payload: action.payload,
                    });
                }
            }
        } else {
            const socket = yield select(
                (state) => state.players.byId[action.payload.playerId].socket
            );
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(
                    JSON.stringify({
                        type: PLAYER.NEXT_STATE,
                        payload: {
                            state: PLAYER_STATE.WAITING_RESULT,
                        },
                    })
                );
            }
        }
    }
}

function* voteSaga() {
    yield all([
        takeEvery('BEGIN_VOTE', beginVote),
        takeEvery('CAST_VOTE', castVote),
        takeEvery('END_VOTE', endVote),
    ]);
}

function* createRoom(action) {
    const roomId = yield call(v1);
    const { playerId } = action.payload;
    const questions = yield select((state) => state.questions.allIds);
    const shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    yield put({
        type: ROOM.ADD_ROOM,
        payload: {
            roomId,
            questions: shuffledQuestions,
        },
    });

    yield joinRoom({ payload: { playerId, roomId } });
}

function* joinRoom(action) {
    const { roomId, playerId } = action.payload;

    if (yield select((state) => state.rooms.byId[roomId])) {
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

        currPlayer.socket.META = {
            playerId,
            roomId,
        };

        const serializedPlayers = players.map((player) => player.serialize());
        // TODO: what if game has begun?
        if (currPlayer.socket.readyState === WebSocket.OPEN) {
            yield currPlayer.socket.send(
                JSON.stringify({
                    type: ROOM.JOIN_ROOM,
                    payload: {
                        roomId,
                    },
                })
            );
        }

        yield all(
            players.map(({ socket }) => {
                if (socket.readyState === WebSocket.OPEN) {
                    return socket.send(
                        JSON.stringify({
                            type: 'LOAD_PLAYERS',
                            payload: {
                                players: serializedPlayers,
                            },
                        })
                    );
                }
            })
        );
    }
}

function* roomSaga() {
    yield all([
        takeEvery('CREATE_ROOM', createRoom),
        takeEvery('START_JOIN_ROOM', joinRoom),
    ]);
}

function* createPlayer(action) {
    const id = yield call(v1);
    const player = Player({
        ...action.payload.player,
        socket: action.payload.socket,
        id,
    });
    action.payload.socket.META = {
        playerId: id,
    };
    yield put({ type: PLAYER.ADD_PLAYER, payload: { player } });

    const { socket, serialize } = player;

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(
            JSON.stringify({
                type: 'CREATE_PLAYER',
                payload: { player: serialize() },
            })
        );
    }
}

function* deletePlayer(action) {
    yield put({
        type: PLAYER.DELETE_USER,
        payload: action.payload,
    });
    const players = yield getPlayersInRoom(action.payload.roomId);
    if (players.length === 0) {
        yield put({
            type: ROOM.DESTROY_ROOM,
            payload: action.payload,
        });
    } else {
        const serializedPlayers = players.map((player) => player.serialize());
        yield all(
            players.map(({ socket }) => {
                if (socket.readyState === WebSocket.OPEN) {
                    return socket.send(
                        JSON.stringify({
                            type: 'LOAD_PLAYERS',
                            payload: {
                                players: serializedPlayers,
                            },
                        })
                    );
                }
            })
        );
    }
}

function* playerSaga() {
    yield all([
        takeEvery('CREATE_PLAYER', createPlayer),
        takeEvery('DISCONNECT_USER', deletePlayer),
    ]);
}

export default function* rootSaga() {
    yield all([voteSaga(), roomSaga(), playerSaga()]);
}
