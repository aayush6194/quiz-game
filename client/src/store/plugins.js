export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.onmessage = ({ data }) => {
            const payload = JSON.parse(data);
            switch (payload.type) {
                case 'LOAD_STATE':
                    store.commit('loadQuestions', payload.data.questions);
                    store.commit('loadPlayers', payload.data.players);
                    store.commit('setVoting', payload.data.voting);
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
