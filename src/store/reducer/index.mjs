import { combineReducers } from 'redux';
import roomReducer from './room.mjs';
import playerReducer from './player.mjs';
import questionReducer from './question.mjs';

export default combineReducers({
    rooms: roomReducer,
    players: playerReducer,
    questions: questionReducer,
});
