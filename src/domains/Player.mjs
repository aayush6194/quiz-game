import R from 'rambda';

export const Player = R.curry(({ id, name, avatar, socket }) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        name,
        avatar,
        socket,
        id,
        serialize: () => ({
            id,
            avatar,
            name,
        }),
    })
);
