const state = {
    player: {
        name: undefined,
        avatar: undefined,
        room: undefined,
    },
    players: [],
};

const getters = {
    player: (state) => state.player,
    players: (state) => state.players,
};

const actions = {
    setPlayer({ commit }, player) {
        commit('setPlayer', player);
    },
    setRoom({ commit }, room) {
        commit('setRoom', room);
    },
};

const mutations = {
    setPlayer: (state, player) => (state.player = player),
    setRoom: (state, room) => (state.player.room = room),
    loadPlayers: (state, payload) => (state.players = payload.players),
};

export default {
    state,
    actions,
    getters,
    mutations,
};
