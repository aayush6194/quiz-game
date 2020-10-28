const state = {
    player: {
        name: undefined,
        avatar: undefined,
        room: undefined,
        state: undefined,
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
    setState: (state, nextState) => (state.player.state = nextState),
    loadPlayers: (state, players) => (state.players = players),
};

export default {
    state,
    actions,
    getters,
    mutations,
};
