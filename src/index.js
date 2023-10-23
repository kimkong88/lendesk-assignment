const http = require("http");
const app = require("./app");
const server = http.createServer(app);

server.listen({ port: 3000 }, () => [
    // connect to redis
    console.info("Server connected at port 3000"),
]);

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
