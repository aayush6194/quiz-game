export const socket = new WebSocket('ws://localhost:8081');

export function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}
