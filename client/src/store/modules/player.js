const state = {
    player: {
        name: undefined,
        avatar: undefined,
        // TODO: implement rooms
        room: 1,
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
        commit('roomSet', room);
    },
};

const mutations = {
    setPlayer: (state, payload) => (state.player = payload.player),
    roomSet: (state, room) => (state.player.room = room),
    loadPlayers: (state, payload) => (state.players = payload.players),
};

export default {
    state,
    actions,
    getters,
    mutations,
};
