import { sendMessage } from '../index';

const state = {
    voting: null,
};

const getters = {};

const actions = {
    startVoting() {
        sendMessage({ type: 'NEXT_VOTE' });
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
