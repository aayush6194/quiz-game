
import playerController from "./player-controller.mjs";

const SetRoutes = (app) => {
  app
    .post("/answer", playerController.checkAnswer)
};

export { SetRoutes };