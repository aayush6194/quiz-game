import immer from 'immer';
const { produce } = immer;

export const addPlayer = produce((draft, player) => {
    draft.players.push(player);
});
