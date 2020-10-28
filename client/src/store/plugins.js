/**
 * 
 * @param {Object} socket object
 */
export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.onmessage = ({ data }) => {
            const action = JSON.parse(data);
            switch (action.type) {
                case 'LOAD_STATE':
                    if (action.payload.results) {
                        store.commit('loadResults', {
                            results: action.payload.results,
                        });
                    } else {
                        store.commit('loadQuestions', action.payload.questions);
                        store.commit('loadPlayers', {
                            players: action.payload.players,
                        });
                        store.commit('setVoting', action.payload.voting);
                    }
                    break;
                case 'NEXT_VOTE':
                    store.commit('setVoting', action.payload.voting);
                    break;
                default:
                    break;
            }
        };
        store.subscribeAction((action) => socket.send(JSON.stringify(action)));
    };
}
