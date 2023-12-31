const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const redis = require("redis");
const rejson = require("redis-rejson");
const RedisClientService = require("./services/redis-client.service");

rejson(redis);

require("dotenv").config();

const { REDIS_ENDPOINT_URI, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, PORT } =
    process.env;

server.listen({ port: PORT }, () => {
    // connect to redis

    try {
        const redisEndpointUri = REDIS_ENDPOINT_URI
            ? REDIS_ENDPOINT_URI.replace(/^(redis\:\/\/)/, "")
            : `${REDIS_HOST}:${REDIS_PORT}`;

        const redisClient = redis.createClient(`redis://${redisEndpointUri}`, {
            password: REDIS_PASSWORD,
        });

        const redisClientService = new RedisClientService(redisClient);

        // this pattern is only used for external services that will be consumed
        app.set("redisClientService", redisClientService);

        console.info(`Redis connected at ${redisEndpointUri}`);
    } catch (e) {
        console.error("Failed to connect to Redis", e);
        process.exit(1);
    }

    console.info(`Server connected at port ${PORT}`);
});

const injectDependencies = () => {};

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error.message, error.stack);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
