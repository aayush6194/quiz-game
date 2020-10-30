import { compose, curry } from 'rambda';

export const Question = curry((id, question, choices) =>
    compose(
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
