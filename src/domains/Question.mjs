import R from 'rambda';

export const Question = R.curry((question, choices) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        question,
        choices,
    })
);
