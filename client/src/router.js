import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import Result from "./pages/Result.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/game",
    name: "game",
    component: Game,
  },
  {
    path: "/",
    name: "result",
    component: Result,
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: () => import("./pages/Leaderboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;