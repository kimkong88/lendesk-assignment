const Joi = require("@hapi/joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick.util");
const ApiError = require("../utils/api-error.util");

// Middleware function for request validation using a schema.
const validate = (schema) => (req, res, next) => {
    // Create a valid schema object by selecting only "params," "query," and "body" properties.
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);

    // If validation produces an error, generate a detailed error message.
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // If validation is successful, assign the validated values to the request object.
    Object.assign(req, value);

    // Proceed to the next middleware or route handler.
    return next();
};

module.exports = validate;
