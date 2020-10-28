import { combineReducers } from 'redux';
import { produce } from 'immer';
import { ACTIONS } from '../actions/room.mjs';

const roomsById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            draft[action.payload.roomId] = {
                players: [],
            };
            break;
        case ACTIONS.JOIN_ROOM:
            draft[action.payload.roomId].players.push(action.payload.playerId);
            break;
        case ACTIONS.ADD_VOTE:
            draft.push(action.payload.vote);
            break;
        case ACTIONS.NEXT_VOTE:
            draft[action.payload.roomId].voting =
                (draft[action.payload.roomId].voting ?? -1) + 1;
            break;
    }
}, {});

const allRooms = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            draft.push(action.payload.roomId);
            break;
    }
}, []);

export default combineReducers({
    byId: roomsById,
    allIds: allRooms,
});
