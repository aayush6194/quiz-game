import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    ADD_VOTE: 'ADD_VOTE',
};

export const addVote = produce((draft, { playerId, choiceId }) => {
    if (!draft.tallies[draft.voting][choiceId]) {
        draft.tallies[draft.voting] = {
            [choiceId]: [],
        };
    }
    draft.tallies[draft.voting][choiceId].push(playerId);
});
