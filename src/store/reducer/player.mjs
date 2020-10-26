import * as player from '../actions/player.mjs';
const ACTIONS = player.ACTIONS;

const intialState = {
    players: [],
};

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.CREATE_player:
            return player.addPlayer(state, action.payload.player);
        default:
            return state;
    }
}
