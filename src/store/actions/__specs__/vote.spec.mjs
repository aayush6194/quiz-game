import * as actions from '../vote.mjs';
import { Question } from '../../domains/Question.mjs';
import { Choice } from '../../domains/Choice.mjs';

describe('vote', () => {
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
        });
    });
});
