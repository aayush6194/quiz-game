import Redux from 'redux';
import rootReducer from './reducer/reducer.mjs';

const store = Redux.createStore(rootReducer);

export default store;
