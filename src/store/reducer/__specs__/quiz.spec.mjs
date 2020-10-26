import * as quiz from '../../actions/quiz.mjs';
import reducer from '../quiz.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';
const ACTIONS = quiz.ACTIONS;

describe('quiz reducer', () => {
    it(`should handle ${ACTIONS.CREATE_QUIZ}`, () => {
        const baseState = {};
        const choices = [1999, 1975, 1991].map((v) => Choice(v));
        choices.push(Choice(1989, true));
        const questions = [
            Question(
                'In what year was Sega Genesis released in North America?',
                choices
            ),
        ];
        const action = { type: ACTIONS.CREATE_QUIZ, questions };
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
