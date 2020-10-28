import { sendMessage } from '../index';

const state = {
    voting: null,
};

const getters = {};

const actions = {
    setVoting(voting) {
        state.voting = voting;
    },
    addVote(_, { playerId, choiceId }) {
        sendMessage({ type: 'CAST_VOTE', payload: { playerId, choiceId } });
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
