import { combineReducers } from 'redux';
import { produce } from 'immer';
import { ACTIONS } from '../actions/player.mjs';

const playersById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PLAYER:
            const player = action.payload.player;
            draft[player.id] = player;
            break;
        case ACTIONS.DELETE_USER:
            delete draft[(action.payload?.playerId)];
            break;
        case ACTIONS.NEXT_STATE:
            action.payload.playerIds.forEach((id) => {
                draft[id] = action.payload.state;
            });
    }
}, {});

const allPlayers = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PLAYER:
            draft.add(action.payload.player.id);
            break;
        case ACTIONS.DELETE_USER:
            draft.delete(action.payload.playerId);
            break;
    }
}, new Set());

export default combineReducers({
    byId: playersById,
    allIds: allPlayers,
});
