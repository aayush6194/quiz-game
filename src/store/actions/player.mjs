import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    ADD_PLAYER: 'ADD_PLAYER',
};

export const addPlayer = produce((draft, player) => {
    draft.players.push(player);
});
