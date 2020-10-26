export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.onmessage = ({ data }) => {
            const action = JSON.parse(data);
            switch (action.type) {
                case 'LOAD_STATE':
                    store.commit('loadQuestions', action.payload.questions);
                    store.commit('loadPlayers', action.payload.players);
                    store.commit('setVoting', action.payload.voting);
                    break;
                case 'NEXT_VOTE':
                    store.commit('setVoting', action.payload.voting);
                    break;
                default:
                    break;
            }
        };
        // store.subscribe((mutation) => {
        //     socket.emit('action', mutation);
        // });
    };
}
