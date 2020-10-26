import Vuex from 'vuex';
import question from './modules/question';
import player from './modules/player';

export default new Vuex.Store({
  modules: {
      question,
      player
  }
});