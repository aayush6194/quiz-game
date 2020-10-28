import R from 'rambda';

export const Question = R.curry((id, question, choices) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        id,
        question,
        choices,
        serialize: (hideAns = true) => ({
            id,
            question,
            choices: choices.map((choice) => choice.serialize(hideAns)),
        }),
    })
);
