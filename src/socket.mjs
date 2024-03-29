import { Server } from 'ws';
import store from './store/index';

const wss = new Server({ noServer: true });

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
            store.dispatch.bind(store)(action);
        }
    });
    socket.on('close', () => {
        store.dispatch.bind(store)({
            type: 'DISCONNECT_USER',
            payload: socket.META,
        });
    });
});

export default wss;
