import { compose, curry } from 'rambda';
import { PLAYER_STATE } from '../store/actions/player';

export const Player = curry(
    ({ id, name, avatar, state = PLAYER_STATE.IN_LOBBY, socket }) =>
        compose(
            Object.seal,
            Object.freeze
        )({
            name,
            avatar,
            socket,
            id,
            state,
            serialize: () => ({
                id,
                avatar,
                name,
                state,
            }),
            setState: (state) => Player({ id, name, avatar, state, socket }),
        })
);
