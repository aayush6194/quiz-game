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
                    store.commit('loadResults', {
                        results: action.payload.results,
                    });
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
                    socket.send(
                        JSON.stringify({
                            type: 'EN_VOTE',
                            payload: {
                                playerId: store.getters.player.id,
                                roomId: store.getters.player.room,
                            },
                        })
                    );
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
