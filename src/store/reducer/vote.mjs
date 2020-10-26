import * as vote from '../actions/vote.mjs';
const ACTIONS = vote.ACTIONS;

const intialState = {
    voting: 0,
    tallies: {},
};

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_VOTE:
            return vote.addVote(state, {
                playerId: action.payload.playerId,
                choiceId: action.payload.choiceId,
            });
        case ACTIONS.NEXT_VOTE:
            return vote.nextVote(state);
        default:
            return state;
    }
}
