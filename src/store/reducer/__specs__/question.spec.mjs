import * as question from '../../actions/question.mjs';
import reducer from '../reducer.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';

const ACTIONS = question.ACTIONS;

describe('question reducer', () => {
    it(`should handle ${ACTIONS.LOAD_QUESTIONS}`, () => {
        const baseState = {};
        const action = {
            type: ACTIONS.LOAD_QUESTIONS,
            payload: {
                questions: [
                    Question(
                        'In what year was Sega Genesis released in North America?',
                        [
                            ...[1999, 1975, 1991].map((v) => Choice(v)),
                            Choice(1989, true),
                        ]
                    ),
                ],
            },
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
        });
    });
});
