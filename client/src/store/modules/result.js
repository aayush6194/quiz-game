import router from '../../router';

const state = {
    results: {},
    wait: false,
    result: undefined,
};

const getters = {
    results: (state) => state.results,
    wait: (state) => state.wait,
    result: (state) => state.result,
};

const mutations = {
    loadResults: (state, payload) => {
        state.results = payload.results;
        router.push('/result');
    },
    setWait: (state, wait) => (state.wait = wait),
    setResult: (state, result) => (state.result = result),
};

export default {
    state,
    getters,
    mutations,
};
