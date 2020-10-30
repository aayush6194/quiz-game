import * as express from 'express';
import { SetRoutes } from './routes/index';
import MiddleWares from './middlewares/index';
import { Port } from './config';
import wss from './socket';
import { readFile, getQuestions } from './utils/index';
import store from './store/index';
import { ACTIONS } from './store/actions/question';

const questions = getQuestions(readFile('quizQuestions.txt'));
store.dispatch({
    type: ACTIONS.LOAD_QUESTIONS,
    payload: { questions },
});

const app = express();

MiddleWares.init(app);

const server = app.listen(Port);
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});
console.log(`Running on Port : ${Port}`);

SetRoutes(app);

export default app;
