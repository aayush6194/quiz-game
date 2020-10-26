import * as actions from '../question.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';

describe('question', () => {
    it('should add the questions to the state', () => {
        const state = {};
        const choices = [1999, 1975, 1991].map((v) => Choice(v));
        choices.push(Choice(1989, true));
        const questions = [
            Question(
                'In what year was Sega Genesis released in North America?',
                choices
            ),
        ];
        const nextState = actions.createQuiz(state, questions);
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
