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

                        store.commit('setVoting', action.payload.voting);
                    }
                    break;
                case 'WAIT_RESULT':
                    store.commit('setWait', true);
                    break;
                case 'LOAD_RESULT':
                    store.commit('setWait', false);
                    store.commit('setResult', action.payload.result);
                    break;
                case 'NEXT_VOTE':
                    store.commit('setResult', undefined);
                    store.commit('setQuestion', action.payload.question);
                    break;
                case 'CREATE_PLAYER':
                    store.commit('setPlayer', action.payload.player);
                    break;
                case 'JOIN_ROOM':
                    store.commit('setRoom', action.payload.roomId);
                    break;
                case 'LOAD_PLAYERS':
                    store.commit('loadPlayers', action.payload.players);
                    break;
                default:
                    break;
            }
        };
        store.subscribeAction((action) => socket.send(JSON.stringify(action)));
    };
}
