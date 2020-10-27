import {
    all,
    takeEvery,
    put,
    take,
    race,
    delay,
    select,
} from 'redux-saga/dist/redux-saga-effects.umd.js';
import { ACTIONS as VOTE } from './actions/vote.mjs';

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
    while (true) {
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
    }
}

function* voteSaga() {
    yield takeEvery('BEGIN_VOTE', beginVote);
}

export default function* rootSaga() {
    yield all([voteSaga()]);
}
