const httpStatus = require("http-status");

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    const response = {
        code: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message,
        stack: err.stack,
    };

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(response);
};

module.exports = {
    errorHandler,
};
