import { addRoom } from '../room.mjs';

describe('room', () => {
    it('should add a room to the state', () => {
        const baseState = {};
        const id = 1;
        const nextState = addRoom(baseState, id);
        expect(nextState).toEqual({
            1: {
                players: [],
            },
        });
    });
});
