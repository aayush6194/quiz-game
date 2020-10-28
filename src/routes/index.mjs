import controller from './controller.mjs';

const SetRoutes = (app) => {
    app.get('/', controller.message);
};

export { SetRoutes };
