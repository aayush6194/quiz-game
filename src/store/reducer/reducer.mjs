import * as question from '../actions/question.mjs';
import * as player from '../actions/player.mjs';
import * as vote from '../actions/vote.mjs';

const initialState = {
    voting: undefined,
    tallies: {},
    players: [],
    questions: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case vote.ACTIONS.ADD_VOTE:
            return vote.addVote(state, {
                playerId: action.payload.playerId,
                choiceId: action.payload.choiceId,
            });
        case vote.ACTIONS.NEXT_VOTE:
            return vote.nextVote(state);
        case player.ACTIONS.ADD_PLAYER:
            return player.addPlayer(state, action.payload.player);
        case question.ACTIONS.LOAD_QUESTIONS:
            return question.loadQuestions(state, action.payload.questions);
        default:
            return state;
    }
}
