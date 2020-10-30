import { compose, curry } from 'rambda';

export const Choice = curry((id, value, isAnswer = false) =>
    compose(
        Object.seal,
        Object.freeze
    )({
        id,
        value,
        isAnswer,
        serialize: (hideAns = true) => {
            if (hideAns) {
                return { id, value };
            }
            return { id, value, isAnswer };
        },
    })
);
