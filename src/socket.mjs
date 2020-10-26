import WebSocket from 'ws';
import store from './store/index.mjs';

export const init = (server) => {
    let wss = new WebSocket.Server({ server });

    store.subscribe(() => wss.emit('state', store.getState()));

    wss.on('connection', (socket) => {
        socket.emit('state', store.getState());
        socket.on('action', store.dispatch.bind(store));
    });
};

export default { init };
