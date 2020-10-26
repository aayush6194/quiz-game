const state = {
  player: {
    name: "",
    avatar: -1,
    room: undefined,
  },
};

const getters = {
  player: (state) => state.player,
};

const actions = {
  setPlayer({ commit }, player) {
    commit("set", player);
  },

  setRoom({ commit }, room) {
    commit("roomSet", room);
  },
};

const mutations = {
  set: (state, player) => (state.player = player),
  roomSet: (state, room) => (state.player = {...state.player, room}),
};

export default {
  state,
  actions,
  getters,
  mutations,
};
