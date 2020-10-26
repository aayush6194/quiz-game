const state = {
  player: { 
    name: '',
    avatar: -1
}
};

const getters = {
  player: state => state.player
};

const actions = {
  setPlayer({ commit }, player) {
    alert(JSON.stringify(player))
    commit('set', player);
  }
}

const mutations = {
  set : (state, player) => (state.player = player),
};

export default {
  state,
  actions,
  getters,
  mutations
};