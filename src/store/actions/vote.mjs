import immer from 'immer';
const { produce } = immer;

const getScoreBoard = ({ players, questions, tallies }) => {
    const scores = {};
    Object.entries(tallies).forEach(([questionId, tally]) => {
        const choices = questions[questionId].choices;
        return Object.entries(tally).forEach(([choiceId, playerIds]) => {
            const choice = choices[choiceId];
            return playerIds.forEach((playerId) => {
                // TODO: replace with id
                const player = players[playerId].name;
                if (!scores[player]) {
                    scores[player] = {
                        player: {
                            name: player,
                        },
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
    return Object.values(scores);
};

const totalVotes = (choices) => {
    if (!choices) {
        return 0;
    }
    return Object.values(choices).reduce((total, players) => {
        return total + players.length;
    }, 0);
};

const addVote = produce((draft, { playerId, choiceId }) => {
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

export const handleVote = (state, payload) => {
    const nextState = addVote(state, payload);
    if (
        totalVotes(nextState.tallies[nextState.voting]) ===
        nextState.players.length
    ) {
        return nextVote(nextState);
    }
    return nextState;
};

export const ACTIONS = {
    ADD_VOTE: 'ADD_VOTE',
    NEXT_VOTE: 'NEXT_VOTE',
};
