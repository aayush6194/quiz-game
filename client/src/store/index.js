import Vuex from 'vuex';
import question from './modules/question';
import player from './modules/player';
import result from './modules/result';
import createWebSocketPlugin from './plugins';
import { socket } from '../socket';

const plugin = createWebSocketPlugin(socket);

export default new Vuex.Store({
    modules: {
        question,
        player,
        result,
    },
    plugins: [plugin],
});
