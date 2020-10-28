import R from 'rambda';

export const Choice = R.curry((id, value, isAnswer = false) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        id,
        value,
        isAnswer,
    })
);
