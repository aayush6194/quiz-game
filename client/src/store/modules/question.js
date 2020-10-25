const state = {
  question: {}
};

const getters = {
  question: state => state.question
};

const actions = {
  async getQuestion({ commit }) {
   
    commit('getQuestion', {});
  }
}
 

const mutations = {
  setQuestion: (state, question) => (state.question = question)
};

export default {
  state,
  getters,
  actions,
  mutations
};