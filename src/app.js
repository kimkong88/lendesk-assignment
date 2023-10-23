const express = require("express");
const xss = require("xss-clean");
const httpStatus = require("http-status");
const cors = require("cors");

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

// send back a 404 error for any unknown api request
app.use((_, __, next) => {
    next(new Error(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
