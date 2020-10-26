import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    LOAD_QUESTIONS: 'LOAD_QUESTIONS',
};

export const loadQuestions = produce((draft, questions) => {
    draft.questions = questions;
});
