import * as player from './player.mjs';

export const mapClientActions = (type) => {
    switch (type) {
        case 'setPlayer':
            return player.ACTIONS.ADD_PLAYER;
        default:
            return type;
    }
};
