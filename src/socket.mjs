import WebSocket from 'ws';
import { mapClientActions } from './store/actions/helpers.mjs';
import store from './store/index.mjs';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (socket) => {
    socket.on('message', (data) => {
        const action = JSON.parse(data);
        if (action.type === 'CREATE_PLAYER') {
            store.dispatch.bind(store)({
                type: action.type,
                payload: {
                    ...action.payload,
                    socket,
                },
            });
        } else {
            store.dispatch.bind(store)({
                type: mapClientActions(action.type),
                payload: action.payload,
            });
        }
    });
    socket.on('close', () => {
        store.dispatch.bind(store)({
            type: 'DELETE_USER',
            payload: { ...socket.META },
        });
    });
});

export default wss;
