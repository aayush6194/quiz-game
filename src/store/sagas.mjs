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

function* getPlayersInRoom(roomId) {
    const [players, allPlayers] = yield select((state) => [
        state.rooms.byId[roomId].players,
        state.players.byId,
    ]);
    return players.map((playerId) => {
        const { socket, ...player } = allPlayers[playerId];
        return player;
    });
}

function* beginVote() {
    yield put({ type: VOTE.NEXT_VOTE });
    let i = 0;
    const totalQuestions = yield select((state) => state.questions.length);
    while (i < totalQuestions) {
        const { vote } = yield race({
            vote: take('CAST_VOTE'),
            timeout: delay(10_000),
        });
        if (vote) {
            yield put({ type: VOTE.ADD_VOTE, payload: vote.payload });
            const [choices, totalPlayers] = yield select((state) => [
                state.tallies[state.voting],
                state.players.length,
            ]);
            if (totalVotes(choices) === totalPlayers) {
                yield put({ type: VOTE.NEXT_VOTE });
            }
        } else {
            yield put({ type: VOTE.NEXT_VOTE });
        }
        i++;
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
    const [socket, players] = yield all([
        select((state) => state.players.byId[playerId].socket),
        getPlayersInRoom(roomId),
    ]);
    socket.send(
        JSON.stringify({
            type: ROOM.JOIN_ROOM,
            payload: {
                roomId,
            },
        })
    );
    socket.send(
        JSON.stringify({
            type: 'LOAD_PLAYERS',
            payload: {
                players,
            },
        })
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
