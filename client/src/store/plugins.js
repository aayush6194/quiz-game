export default function createWebSocketPlugin(socket) {
    return (store) => {
        socket.addEventListener('message', (state) => {
            store.commit('receiveData', state);
        });
        store.subscribe((mutation) => {
            socket.emit('action', mutation);
        });
    };
}
