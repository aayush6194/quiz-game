import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    ADD_PLAYER: 'ADD_PLAYER',
    DELETE_USER: 'DELETE_USER',
};

export const PLAYER_STATE = {
    IN_LOBBY: 'IN_LOBBY',
    VOTING: 'VOTING',
    WAITING_RESULT: 'WAITING_RESULT',
    ON_RESULT: 'ON_RESULT',
};

export const addPlayer = produce((draft, player) => {
    draft.players.push(player);
});
