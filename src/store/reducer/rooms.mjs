import { RoomActions } from '../actions/room.mjs';

const intialState = {
    rooms : []
}

export default function rootReducer(state = intialState, action){
    switch( action.type){
        case RoomActions.ADD_ROOM:
            return {
                ...intialState, rooms : [...rooms]
            };

        default:
            return state;
    };
};