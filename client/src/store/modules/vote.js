import { sendMessage } from '../index';

const state = {
    voting: null,
};

const getters = {};

const actions = {
    startVoting() {
        sendMessage({ type: 'BEGIN_VOTE' });
    },
    setVoting(voting) {
        state.voting = voting;
    },
    addVote(_, { playerId, choiceId }) {
        sendMessage({ type: 'ADD_VOTE', payload: { playerId, choiceId } });
    },
};

const mutations = {
    setVoting: (state, voting) => (state.voting = voting),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
