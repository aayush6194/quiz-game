import { combineReducers } from 'redux';
import { produce } from 'immer';
import { ACTIONS } from '../actions/room.mjs';

const roomsById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            draft[action.payload.roomId] = {
                players: [],
                voting: -1,
                tallies: {},
            };
            break;
        case ACTIONS.JOIN_ROOM:
            draft[action.payload.roomId].players.push(action.payload.playerId);
            break;
        case ACTIONS.ADD_VOTE:
            const { roomId, choiceId, playerId, questionId } = action.payload;

            if (!draft[roomId].tallies[questionId]) {
                draft[roomId].tallies[questionId] = {};
            }
            if (!draft[roomId].tallies[questionId][choiceId]) {
                draft[roomId].tallies[questionId][choiceId] = [];
            }
            draft[roomId].tallies[questionId][choiceId].push(playerId);
            break;
        case ACTIONS.NEXT_VOTE:
            draft[action.payload.roomId].voting += 1;
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
