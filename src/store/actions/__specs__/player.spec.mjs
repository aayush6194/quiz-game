import { addPlayer } from '../player.mjs';

describe('player', () => {
    it('should add a player to the state', () => {
        const baseState = { players: [] };
        const player = { name: 'Noah' };
        const nextState = addPlayer(baseState, player);
        expect(nextState).toEqual({
            players: [{ name: 'Noah' }],
        });
    });
});
