class AuthService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    register() {
        console.log("register");
    }

    login() {
        console.log("login");
    }
}

module.exports = AuthService;
