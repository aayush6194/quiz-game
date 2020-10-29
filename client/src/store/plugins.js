/**
 *
 * @param {Object} socket object
 */
export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.onmessage = ({ data }) => {
            console.log(store);
            const action = JSON.parse(data);
            console.log(action);
            switch (action.type) {
                case 'LOAD_RESULTS':
                    store.commit('setRoom', undefined);
                    store.commit('setResult', undefined);
                    store.commit('loadPlayers', []);
                    store.commit('setQuestion', null);
                    store.commit('loadResults', {
                        results: action.payload.results,
                    });
                    break;
                case 'LOAD_RESULT':
                    store.commit('setWait', false);
                    store.commit('setQuestion', action.payload.result[1]);
                    store.commit('setResult', action.payload.result[0]);
                    break;
                case 'NEXT_STATE':
                    switch (action.payload.state) {
                        case 'VOTING':
                            store.commit(
                                'setQuestion',
                                action.payload.question
                            );
                            break;
                        case 'WAITING_RESULT':
                            break;
                        case 'ON_RESULT':
                            store.commit(
                                'setQuestion',
                                action.payload.result[1]
                            );
                            store.commit('setResult', action.payload.result[0]);
                            break;
                        default:
                            throw new Error(
                                `unknown state ${JSON.stringify(action)}`
                            );
                    }
                    store.commit('setState', action.payload.state);
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
