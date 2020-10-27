import {
    all,
    takeEvery,
    put,
    take,
    race,
    delay,
} from 'redux-saga/dist/redux-saga-effects.umd.js';
import { ACTIONS as VOTE } from './actions/vote.mjs';

function* beginVote() {
    yield put({ type: VOTE.NEXT_VOTE });
    while (true) {
        const { vote, timeout } = yield race({
            vote: take('CAST_VOTE'),
            timeout: delay(20_000),
        });
        if (vote) {
            yield put({ type: VOTE.ADD_VOTE, payload: vote.payload });
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
