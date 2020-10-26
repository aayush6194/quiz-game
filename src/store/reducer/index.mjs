import redux from 'redux';
// import rooms from './room.mjs';
import question from './question.mjs';
import vote from './vote.mjs';
import player from './player.mjs';

export default redux.combineReducers({
    question,
    player,
    vote,
});
