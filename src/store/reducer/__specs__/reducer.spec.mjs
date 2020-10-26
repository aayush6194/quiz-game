import reducer from '../index.mjs';
import * as questions from '../../actions/question.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';

const ACTIONS = questions.ACTIONS;

describe('root reducer', () => {
    it('has an initial state', () => {
        const action = {
            type: ACTIONS.ADD_QUESTIONS,
            payload: {
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
                            ...['Half-Life', 'God Of War', 'Fallout 3'].map(
                                (v) => Choice(v)
                            ),
                        ]
                    ),
                ],
            },
        };
        const nextState = reducer(undefined, action);
        expect(nextState).toEqual({
            question: {
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
                            ...['Half-Life', 'God Of War', 'Fallout 3'].map(
                                (v) => Choice(v)
                            ),
                        ]
                    ),
                ],
            },
            player: { players: [] },
            vote: { voting: 0, tallies: {} },
        });
    });
});
