import { createWebHistory, createRouter } from 'vue-router';
import Home from './pages/Home.vue';
import Game from './pages/Game.vue';
import Result from './pages/Result.vue';
import store from './store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
    },
    {
        path: '/result',
        component: Result,
        beforeEnter(_, from, next) {
            if (Object.values(store.getters.results).length === 0) {
                next(from);
            } else {
                next();
            }
        },
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        component: () => import('./pages/Leaderboard.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;