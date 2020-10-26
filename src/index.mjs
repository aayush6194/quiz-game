import express from 'express';
import { SetRoutes } from './routes/index.mjs';
import MiddleWares from './middlewares/index.mjs';
import swaggerUi from 'swagger-ui-express';
//import { swaggerDocument } from './docs/index.mjs';
import { Port } from './config.mjs';
import * as http from 'http';
import Socket from './socket.mjs';
import { readFile, getQuestions } from './utils/index.mjs';
import store from './store/index.mjs';
import { ACTIONS } from './store/actions/question.mjs';

const questions = getQuestions(readFile('quizQuestions.txt'));
store.dispatch({
    type: ACTIONS.LOAD_QUESTIONS,
    payload: { questions },
});

const server = http.createServer();
const app = express();

Socket.init(server);
server.listen(8082);

MiddleWares.init(app);
app.listen(Port, 'localhost');
console.log(`Running on Port : ${Port}`);

SetRoutes(app);
//app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res) => {
    console.log(err);
    res.status(400).send({ success: false, message: err.message || err });
});

export default app;
