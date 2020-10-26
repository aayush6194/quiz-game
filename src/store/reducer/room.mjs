import * as room from '../actions/room.mjs';

const ACTIONS = room.ACTIONS;

const intialState = {
    rooms: [],
};

export default function rootReducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            return room.addRoom(state, action.payload.id);
        default:
            return state;
    }
}
