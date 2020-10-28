import { combineReducers } from 'redux';
import { produce } from 'immer';
import { ACTIONS } from '../actions/room.mjs';
import { ACTIONS as PLAYER } from '../actions/player.mjs';
import { enableMapSet } from 'immer';

enableMapSet();

const roomsById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            draft[action.payload.roomId] = {
                players: new Set(),
                voting: -1,
                tallies: {},
                questions: action.payload.questions,
            };
            break;
        case ACTIONS.JOIN_ROOM:
            draft[action.payload.roomId].players.add(action.payload.playerId);
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
        case ACTIONS.DESTROY_ROOM:
            delete draft[action.payload.roomId];
            break;
        // TODO: move this to redux saga to trigger destroy room
        case PLAYER.DELETE_USER:
            draft[action.payload.roomId].players.delete(
                action.payload.playerId
            );
            if (draft[action.payload.roomId].players.size === 0) {
                delete draft[action.payload.roomId];
            }
            break;
    }
}, {});

const allRooms = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ROOM:
            draft.add(action.payload.roomId);
            break;
        case ACTIONS.DESTROY_ROOM:
            draft.delete(action.payload.roomId);
            break;
    }
}, new Set());

export default combineReducers({
    byId: roomsById,
    allIds: allRooms,
});
