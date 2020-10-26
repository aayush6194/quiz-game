import * as player from '../../actions/player.mjs';
import reducer from '../reducer.mjs';

const ACTIONS = player.ACTIONS;

describe('player reducer', () => {
    it(`should handle ${ACTIONS.ADD_PLAYER}`, () => {
        const baseState = { players: [] };
        const action = {
            type: ACTIONS.ADD_PLAYER,
            payload: { player: 'Noah' },
        };
        const nextState = reducer(baseState, action);
        expect(nextState).toEqual({
            players: ['Noah'],
        });
    });
});
