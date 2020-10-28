import { combineReducers } from 'redux';
import { produce } from 'immer';
import { ACTIONS } from '../actions/player.mjs';

const playersById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PLAYER:
            const player = action.payload.player;
            draft[player.id] = player;
            break;
    }
}, {});

const allPlayers = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PLAYER:
            draft.push(action.payload.player.id);
            break;
    }
}, []);

export default combineReducers({
    byId: playersById,
    allIds: allPlayers,
});
