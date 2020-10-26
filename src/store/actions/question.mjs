import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    ADD_QUESTIONS: 'ADD_QUESTIONS',
};

export const createQuiz = produce((draft, questions) => {
    draft.questions = questions;
});
