
import playerController from "./player-controller.mjs";

const SetRoutes = (app) => {
  app
    .post("/leaderboard", playerController.leaderboard)
};

export { SetRoutes };