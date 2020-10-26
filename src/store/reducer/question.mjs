import * as questions from '../actions/question.mjs';
const ACTIONS = questions.ACTIONS;

const intialState = {
    questions: [],
};

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_QUESTIONS:
            return questions.addQuestions(state, action.payload.questions);
        default:
            return state;
    }
}
