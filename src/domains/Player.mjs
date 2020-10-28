import R from 'rambda';
import udid from 'uuid';

const { v1 } = udid;

export const Player = R.curry(({ name, avatar, socket, id = v1() }) =>
    R.compose(
        Object.seal,
        Object.freeze
    )({
        name,
        avatar,
        socket,
        id,
    })
);
