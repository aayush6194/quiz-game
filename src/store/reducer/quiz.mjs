import * as quiz from '../actions/quiz.mjs';
const ACTIONS = quiz.ACTIONS;

const intialState = {
    quiz: [],
};

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case ACTIONS.CREATE_QUIZ:
            return quiz.createQuiz(state, action.questions);
        default:
            return state;
    }
}
