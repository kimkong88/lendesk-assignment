const httpStatus = require("http-status");
const { authService } = require("../services");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = authService.register(email, password);
    res.status(httpStatus.CREATED).send(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = authService.register(email, password);
    res.send(user);
};

module.exports = {
    register,
    login,
};
