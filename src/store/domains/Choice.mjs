import R from 'rambda';

export const Choice = R.curry((value, isAnswer = false) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        value,
        isAnswer,
    })
);
