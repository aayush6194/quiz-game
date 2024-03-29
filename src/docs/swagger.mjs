const config = {
    swagger: '2.0',
    info: {
        title: '',
        version: '1.0.0',
    },
    host: 'localhost:8081',
    basePath: '/',
    schemes: ['http'],
    produces: ['application/json'],
    paths: {
        '/user': {
            get: {
                tags: ['leaderboard'],
                summary: 'get leaderboard info',
                description: '',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                },
            },
        },
    },
};

export default config;
