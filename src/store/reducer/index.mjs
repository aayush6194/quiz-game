import { combineReducers } from 'redux';
// import rooms from './room.mjs';
import quiz from './quiz.mjs';
import room from './room.mjs';
import vote from './vote.mjs';

export default combineReducers({
    quiz,
    room,
    vote,
});
