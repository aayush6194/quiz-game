import router from '../../router';

const state = {
    results: {},
};

const getters = {
    results: (state) => state.results,
};

const mutations = {
    loadResults: (state, payload) => {
        state.results = payload.results;
        router.push('/result');
    },
};

export default {
    state,
    getters,
    mutations,
};
