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
    yield all([voteSaga(), playerSaga()]);
}
