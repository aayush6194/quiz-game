import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// mouting App.vue with router and vuex store
createApp(App)
  .use(router)
  .use(store)
  .mount('#app');