import * as vote from '../../actions/vote.mjs';
import reducer from '../vote.mjs';
import { Question } from '../../domains/Question.mjs';
import { Choice } from '../../domains/Choice.mjs';
const ACTIONS = vote.ACTIONS;

describe('vote reducer', () => {
    it(`should handle ${ACTIONS.ADD_VOTE}`, () => {
        const choiceId = 1;
        const playerId = 3;
        const questionId = 0;
        const baseState = {
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
        const action = {
            type: ACTIONS.ADD_VOTE,
            payload: { playerId, choiceId },
        };
        const nextState = reducer(baseState, action);
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

    it(`should handle ${ACTIONS.NEXT_VOTE}`, () => {
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
        const nextState = vote.nextVote(state);
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
});
