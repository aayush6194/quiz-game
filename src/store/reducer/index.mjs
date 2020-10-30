import { combineReducers } from 'redux';
import roomReducer from './room';
import playerReducer from './player';
import questionReducer from './question';

export default combineReducers({
    rooms: roomReducer,
    players: playerReducer,
    questions: questionReducer,
});
