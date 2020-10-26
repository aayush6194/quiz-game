import { createStore } from 'redux';
import rootReducer from './reducer/reducer.mjs';

const store = createStore(rootReducer);

export default store;
