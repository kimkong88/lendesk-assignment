const bcrypt = require("bcryptjs");
const ApiError = require("../utils/api-error.util");
const httpStatus = require("http-status");
const { tokenService } = require(".");
const moment = require("moment");

/**
 * register a user using email and password
 * @param {string} email
 * @param {string} password
 * @param {RedisClientService} redisClientService
 * @returns returns an user object
 */
const register = async (email, password, redisClientService) => {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = {
        email,
        password: hashedPassword,
        createdAt: new Date(),
    };

    try {
        const res = await redisClientService.jsonGet(`user:${email}`);

        if (res) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Registration failed");
        }

        await redisClientService.jsonSet(
            `user:${email}`,
            ".",
            JSON.stringify(user)
        );

        return user;
    } catch (e) {
        throw new ApiError(e.statusCode, e.message);
    }
};

/**
 * authenticate a user using email and password
 * @param {string} email
 * @param {string} password
 * @param {RedisClientService} redisClientService
 * @returns returns an user object excluding the password
 */
const login = async (email, password, redisClientService) => {
    const res = await redisClientService.jsonGet(`user:${email}`);

    if (!res) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    const user = JSON.parse(res);

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    // remove password from response
    delete user.password;

    // create access token
    const accessTokenExpires = moment().add(
        process.env.JWT_EXPIRE_MINUTES,
        "minutes"
    );
    const accessToken = {
        token: tokenService.generateToken(
            email,
            accessTokenExpires,
            process.env.JWT_SECRET
        ),
        expires: accessTokenExpires.toDate(),
    };

    user.accessToken = accessToken;

    // TODO: create an access token for user to use to authenticate

    return user;
};

module.exports = {
    register,
    login,
};
