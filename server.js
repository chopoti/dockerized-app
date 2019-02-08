'use strict';

const Hapi = require('hapi');
const HapiOpenAPI = require('hapi-openapi');
const Path = require('path');


const init = async function() {
    const server = new Hapi.Server({
        host:'0.0.0.0',
        port: ~~process.env.PORT || 7000,
        routes: {cors: {origin: ['*']} }
    });

    await server.register({
        plugin: HapiOpenAPI,
        options: {
            api: Path.resolve('./config/swagger.json'),
            handlers: Path.resolve('./handlers')
        }
    });

    await server.start();

    return server;
};

init().then((server) => {
    server.plugins.openapi.setHost(server.info.host + ':' + server.info.port);

    console.log(['info'], `Server running on ${server.info.host}:${server.info.port}`);
});
