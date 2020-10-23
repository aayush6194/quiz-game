
import playerController from "./player-controller";

const SetRoutes = (app) => {
  app
    .get("/hello-world", playerController.hello)
};

export { SetRoutes };