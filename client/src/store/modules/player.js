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
        commit('set', player);
    },

    setRoom({ commit }, room) {
        commit('roomSet', room);
    },
};

const mutations = {
    set: (state, player) => (state.player = player),
    roomSet: (state, room) => (state.player.room = room),
    loadPlayers: (state, players) => (state.players = players),
};

export default {
    state,
    actions,
    getters,
    mutations,
};
