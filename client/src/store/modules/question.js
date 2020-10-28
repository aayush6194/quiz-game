const state = {
    question: undefined,
};

const getters = {
    question: (state) => state.question,
};

const mutations = {
    setQuestion: (state, question) => (state.question = question),
};

export default {
    state,
    getters,
    mutations,
};
