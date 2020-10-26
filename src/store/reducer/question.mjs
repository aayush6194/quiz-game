import * as quiz from '../actions/question.mjs';
const ACTIONS = quiz.ACTIONS;

const intialState = {
    questions: [],
};

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.CREATE_QUIZ:
            return quiz.createQuiz(state, action.payload.questions);
        default:
            return state;
    }
}
