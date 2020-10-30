import controller from './controller';

const SetRoutes = (app) => {
    app.get('/', controller.message);
};

export { SetRoutes };
