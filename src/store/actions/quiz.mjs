import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    CREATE_QUIZ: 'CREATE_QUIZ',
};

export const createQuiz = produce((draft, questions) => {
    draft.questions = questions;
});
