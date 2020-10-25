import R from 'rambda';

export const Choice = R.curry((value, isAnswer) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        value,
        isAnswer,
    })
);
