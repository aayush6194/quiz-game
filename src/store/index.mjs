import { createStore } from 'redux';
import rootReducer from './reducer/index.mjs';

const store = createStore(rootReducer);

export default store;
