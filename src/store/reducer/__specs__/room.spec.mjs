import * as room from '../../actions/room.mjs';
import reducer from '../room.mjs';
const ACTIONS = room.ACTIONS;

describe('room reducer', () => {
    it(`should handle ${ACTIONS.ADD_ROOM}`, () => {
        const baseState = {};
        const action = { type: ACTIONS.ADD_ROOM, id: 1 };
        const nextState = reducer(baseState, action);
        expect(nextState).toEqual({
            1: {
                players: [],
            },
        });
    });
});
