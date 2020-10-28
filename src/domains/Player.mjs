import R from 'rambda';
import { PLAYER_STATE } from '../store/actions/player.mjs';

export const Player = R.curry(
    ({ id, name, avatar, state = PLAYER_STATE.IN_LOBBY, socket }) =>
        R.compose(
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
