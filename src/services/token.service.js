const jwt = require("jsonwebtoken");
const moment = require("moment");

/**
 * Generate token
 * @param {string} email
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (email, expires, secret = "secret") => {
    const payload = {
        sub: email,
        iat: moment().unix(),
        exp: expires.unix(),
    };

    return jwt.sign(payload, secret);
};

module.exports = {
    generateToken,
};
