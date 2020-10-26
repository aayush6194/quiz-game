import immer from 'immer';
const { produce } = immer;

const getScoreBoard = ({ players, questions, tallies }) => {
    const scores = {};
    Object.entries(tallies).forEach(([questionId, tally]) => {
        const choices = questions[questionId].choices;
        return Object.entries(tally).forEach(([choiceId, playerIds]) => {
            const choice = choices[choiceId];
            return playerIds.forEach((playerId) => {
                const player = players[playerId];
                if (!scores[player]) {
                    scores[player] = {
                        player,
                        right: 0,
                        wrong: 0,
                    };
                }
                choice.isAnswer
                    ? scores[player].right++
                    : scores[player].wrong++;
            });
        });
    });
    return scores;
};

export const ACTIONS = {
    ADD_VOTE: 'ADD_VOTE',
    NEXT_VOTE: 'NEXT_VOTE',
};

export const addVote = produce((draft, { playerId, choiceId }) => {
    if (!draft.tallies[draft.voting]) {
        draft.tallies[draft.voting] = {};
    }
    if (!draft.tallies[draft.voting][choiceId]) {
        draft.tallies[draft.voting][choiceId] = [];
    }
    draft.tallies[draft.voting][choiceId].push(playerId);
});

export const nextVote = produce((draft) => {
    let voting = (draft.voting ?? -1) + 1;
    if (voting === draft.questions.length) {
        return {
            results: getScoreBoard(draft),
        };
    }
    draft.voting = voting;
});
