const httpStatus = require("http-status");
const { authService } = require("../services");
const catchAsync = require("../utils/catch-async.util");

const register = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const redisClientService = req.app.get("redisClientService");

    const user = await authService.register(
        email,
        password,
        redisClientService
    );
    res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const redisClientService = req.app.get("redisClientService");

    const user = await authService.login(email, password, redisClientService);
    res.send(user);
});

module.exports = {
    register,
    login,
};
