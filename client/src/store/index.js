import Vuex from 'vuex';
import question from './modules/question';
import player from './modules/player';
import createWebSocketPlugin from './plugins';

const socket = new WebSocket('ws://localhost:8081');
const plugin = createWebSocketPlugin(socket);

export default new Vuex.Store({
    modules: {
        question,
        player,
    },
    plugins: [plugin],
});
