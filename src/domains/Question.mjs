import R from 'rambda';

export const Question = R.curry((id, question, choices) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        id,
        question,
        choices,
    })
);
