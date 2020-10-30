import { combineReducers } from 'redux';
import produce from 'immer';
import { ACTIONS } from '../actions/question';

const questionsById = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_QUESTIONS:
            action.payload.questions.forEach((question) => {
                draft[question.id] = question;
            });
            break;
    }
}, {});

const allQuestions = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_QUESTIONS:
            action.payload.questions.forEach((question) => {
                draft.push(question.id);
            });
            break;
    }
}, []);

export default combineReducers({
    byId: questionsById,
    allIds: allQuestions,
});
