const Joi = require("@hapi/joi");

const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message("password must be at least 8 characters");
    }
    if (value.length > 30) {
        return helpers.message("password must be less than 30 characters");
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message(
            "password must contain at least 1 letter and 1 number"
        );
    }
    return value;
};

const register = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email().required(),
        password: Joi.string().custom(password).required(),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().max(50).email().required(),
        password: Joi.string().custom(password).required(),
    }),
};

module.exports = {
    register,
    login,
};
