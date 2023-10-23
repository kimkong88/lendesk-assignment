const express = require("express");
const xss = require("xss-clean");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./utils/error-handler.utils");
const httpStatus = require("http-status");
const ApiError = require("./utils/api-error.util");
const app = express();

// indicates that app is running behind proxy
app.enable("trust proxy");

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options("*", cors());

// register routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((_, __, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// error handler
app.use(errorHandler);

module.exports = app;
