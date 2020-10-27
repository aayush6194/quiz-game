import * as actions from '../vote.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';

describe('vote', () => {
    it('Should start voting on a quiz', () => {
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: null,
        };
        const nextState = actions.nextVote(state);
        expect(nextState).toEqual({
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: 0,
        });
    });

    it('Should put the next question to vote', () => {
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: 0,
        };
        const nextState = actions.nextVote(state);
        expect(nextState).toEqual({
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: 1,
        });
    });

    it('Should create a tally for the selected choice', () => {
        const choiceId = 1;
        const playerId = 3;
        const questionId = 0;
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
            ],
            voting: questionId,
            tallies: {
                [questionId]: {},
            },
            players: Array(4)
                .fill(0)
                .map((_, i) => ({
                    name: i,
                })),
        };
        const nextState = actions.addVote(state, { choiceId, playerId });
        expect(nextState).toEqual({
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
            ],
            voting: questionId,
            tallies: {
                [questionId]: { [choiceId]: [playerId] },
            },
            players: Array(4)
                .fill(0)
                .map((_, i) => ({
                    name: i,
                })),
        });
    });

    it('Should add to existing tally for the selected choice', () => {
        const choiceId = 2;
        const playerId = 10;
        const questionId = 2;
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
            ],
            voting: questionId,
            tallies: {
                0: {
                    [1]: [3, playerId],
                },
                [questionId]: {
                    [choiceId]: [3],
                },
            },
            players: Array(4)
                .fill(0)
                .map((_, i) => ({
                    name: i,
                })),
        };
        const nextState = actions.addVote(state, { choiceId, playerId });
        expect(nextState).toEqual({
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
            ],
            voting: questionId,
            tallies: {
                0: {
                    [1]: [3, playerId],
                },
                [questionId]: {
                    [choiceId]: [3, playerId],
                },
            },
            players: Array(4)
                .fill(0)
                .map((_, i) => ({
                    name: i,
                })),
        });
    });

    // FIXME: moved to sagas
    xit('Should put the next question to vote after all players have voted', () => {
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: 0,
            tallies: {
                0: {
                    [1]: [0],
                },
            },
            players: [{ name: 'Noah' }, { name: 'Shiv' }],
        };
        const nextState = actions.addVote(state, {
            choiceId: 1,
            playerId: 1,
        });
        expect(nextState).toEqual({
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                        Choice('Bioshock', true),
                    ]
                ),
            ],
            voting: 1,
            tallies: {
                0: {
                    [1]: [0, 1],
                },
            },
            players: [{ name: 'Noah' }, { name: 'Shiv' }],
        });
    });

    it('Should have the results when all questions have been voted', () => {
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        Choice('Bioshock', true),
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                    ]
                ),
            ],
            players: Array(5)
                .fill(0)
                .map((_, i) => ({ name: `Player #${i + 1}` })),
            voting: 1,
            tallies: {
                0: { 0: [0], 1: [1, 3], 3: [2, 4] },
                1: { 0: [1, 2], 1: [0], 2: [3], 3: [4] },
            },
        };
        const nextState = actions.nextVote(state);
        expect(nextState).toEqual({
            results: jasmine.arrayContaining([
                {
                    player: { name: 'Player #1' },
                    right: 0,
                    wrong: 2,
                },
                {
                    player: { name: 'Player #2' },
                    right: 1,
                    wrong: 1,
                },
                {
                    player: { name: 'Player #3' },
                    right: 2,
                    wrong: 0,
                },
                {
                    player: { name: 'Player #4' },
                    right: 0,
                    wrong: 2,
                },
                {
                    player: { name: 'Player #5' },
                    right: 1,
                    wrong: 1,
                },
            ]),
        });
    });

    xit('Should have the results after the last player left to vote has voted for the last question', () => {
        const state = {
            questions: [
                Question(
                    'In what year was Sega Genesis released in North America?',
                    [
                        ...[1999, 1975, 1991].map((v) => Choice(v)),
                        Choice(1989, true),
                    ]
                ),
                Question(
                    'Which of the following video games takes place in a dystopian underwater city called Rapture?',
                    [
                        Choice('Bioshock', true),
                        ...['Half-Life', 'God Of War', 'Fallout 3'].map((v) =>
                            Choice(v)
                        ),
                    ]
                ),
            ],
            players: Array(5)
                .fill(0)
                .map((_, i) => ({ name: `Player #${i + 1}` })),
            voting: 1,
            tallies: {
                0: { 0: [0], 1: [1, 3], 3: [2, 4] },
                1: { 0: [1, 2], 1: [0], 2: [3] },
            },
        };
        const nextState = actions.addVote(state, {
            playerId: 4,
            choiceId: 3,
        });
        expect(nextState).toEqual({
            results: jasmine.arrayContaining([
                {
                    player: { name: 'Player #1' },
                    right: 0,
                    wrong: 2,
                },
                {
                    player: { name: 'Player #2' },
                    right: 1,
                    wrong: 1,
                },
                {
                    player: { name: 'Player #3' },
                    right: 2,
                    wrong: 0,
                },
                {
                    player: { name: 'Player #4' },
                    right: 0,
                    wrong: 2,
                },
                {
                    player: { name: 'Player #5' },
                    right: 1,
                    wrong: 1,
                },
            ]),
        });
    });
});
