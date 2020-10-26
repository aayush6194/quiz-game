import WebSocket from 'ws';
import store from './store/index.mjs';

const wss = new WebSocket.Server({ noServer: true });

store.subscribe(() => wss.emit('state', store.getState()));

wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'LOAD_STATE', data: store.getState() }));
    socket.on('action', store.dispatch.bind(store));
});

export default wss;
