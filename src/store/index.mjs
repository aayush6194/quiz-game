import Redux, { applyMiddleware } from 'redux';
import saga from 'redux-saga';
import rootReducer from './reducer/index.mjs';
import rootSaga from './sagas.mjs';

const { default: createSagaMiddleware } = saga;
const sagaMiddleware = createSagaMiddleware();

const store = Redux.createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    // console.log(store.getState());
});

export default store;
