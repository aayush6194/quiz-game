import Redux, { applyMiddleware } from 'redux';
import saga from 'redux-saga';
import rootReducer from './reducer/reducer.mjs';
import rootSaga from './sagas.mjs';

const { default: createSagaMiddleware } = saga;
const sagaMiddleware = createSagaMiddleware();

const store = Redux.createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
