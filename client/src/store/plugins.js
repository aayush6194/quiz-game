/**
 * 
 * @param {Object} socket object
 */
export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.onmessage = ({ data }) => {
            const action = JSON.parse(data);
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
