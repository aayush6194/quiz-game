const state = {
    questions: [],
};

const getters = {
    questions: (state) => state.questions,
};

const actions = {
    async getQuestion({ commit }) {
        commit('getQuestion', {});
    },
};

const mutations = {
    loadQuestions: (state, questions) => (state.questions = questions),
};

export default {
    state,
    getters,
    actions,
    mutations,
};