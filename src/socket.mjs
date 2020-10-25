import WebSocket from 'ws';
let WebSocketServer = WebSocket.Server;

export const init = (server, questions) => {
    let wss = new WebSocketServer({ server })
    console.log('websocket server created')

    wss.on('connection', function (ws) {
        const question = questions[Math.floor((Math.random()* questions.length))]
        ws.send(JSON.stringify(question))

        ws.on('close', function () {
            console.log('websocket connection close')
        })
    })
}

export default { init }