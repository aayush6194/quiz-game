import Vuex from 'vuex';
import question from './modules/question';
import player from './modules/player';
import vote from './modules/vote';
import result from './modules/result';
import createWebSocketPlugin from './plugins';

const socket = new WebSocket('ws://localhost:8081');
const plugin = createWebSocketPlugin(socket);

export function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

export default new Vuex.Store({
    modules: {
        question,
        player,
        vote,
        result,
    },
    plugins: [plugin],
    getters: {
        getQuestionUnderVote: (state) => {
            return state.question.questions[state.vote.voting];
        },
    },
});
