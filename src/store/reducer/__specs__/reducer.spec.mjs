import reducer from '../reducer.mjs';
import * as question from '../../actions/question.mjs';
import * as player from '../../actions/player.mjs';
import * as vote from '../../actions/vote.mjs';
import { Question } from '../../../domains/Question.mjs';
import { Choice } from '../../../domains/Choice.mjs';

describe('root reducer', () => {
    it('has an initial state', () => {
        const action = {
            type: question.ACTIONS.LOAD_QUESTIONS,
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
            players: [],
            voting: null,
            tallies: {},
        });
    });

    it('can be reduced to final state', () => {
        const actions = [
            {
                type: player.ACTIONS.ADD_PLAYER,
                payload: {
                    player: { name: 'Tracer' },
                },
            },
            {
                type: question.ACTIONS.LOAD_QUESTIONS,
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
            },
            {
                type: player.ACTIONS.ADD_PLAYER,
                payload: {
                    player: { name: 'Dave' },
                },
            },
            {
                type: player.ACTIONS.ADD_PLAYER,
                payload: {
                    player: { name: 'Hanzo' },
                },
            },
            {
                type: vote.ACTIONS.NEXT_VOTE,
            },
            {
                type: vote.ACTIONS.ADD_VOTE,
                payload: { playerId: 0, choiceId: 3 },
            },
            {
                type: vote.ACTIONS.ADD_VOTE,
                payload: { playerId: 1, choiceId: 1 },
            },
            {
                type: vote.ACTIONS.ADD_VOTE,
                payload: { playerId: 2, choiceId: 3 },
            },
            {
                type: vote.ACTIONS.ADD_VOTE,
                payload: { playerId: 0, choiceId: 0 },
            },
            {
                type: vote.ACTIONS.ADD_VOTE,
                payload: { playerId: 2, choiceId: 1 },
            },
            {
                type: vote.ACTIONS.NEXT_VOTE,
            },
        ];
        const finalState = actions.reduce(reducer, undefined);

        expect(finalState).toEqual({
            results: {
                Tracer: {
                    player: 'Tracer',
                    right: 2,
                    wrong: 0,
                },
                Dave: {
                    player: 'Dave',
                    right: 0,
                    wrong: 1,
                },
                Hanzo: {
                    player: 'Hanzo',
                    right: 1,
                    wrong: 1,
                },
            },
        });
    });
});
