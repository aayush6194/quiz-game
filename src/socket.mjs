import WebSocket from 'ws';
import store from './store/index.mjs';

const wss = new WebSocket.Server({ noServer: true });

store.subscribe(() => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    type: 'LOAD_STATE',
                    payload: store.getState(),
                })
            );
        }
    });
});

wss.on('connection', (socket) => {
    socket.send(
        JSON.stringify({ type: 'LOAD_STATE', payload: store.getState() })
    );
    socket.on('message', (data) => {
        const action = JSON.parse(data);
        store.dispatch.bind(store)(action);
    });
});

export default wss;
