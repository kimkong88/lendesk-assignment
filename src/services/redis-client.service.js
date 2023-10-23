const { promisify } = require("util");
/**
 * RedisClient service to use promisified methods from redis client
 */
class RedisClientService {
    constructor(redisClient) {
        ["json_get", "json_set"].forEach(
            (method) => (redisClient[method] = promisify(redisClient[method]))
        );
        this.redis = redisClient;
    }
    jsonGet(key) {
        return this.redis.json_get(key);
    }

    jsonSet(key, path, json) {
        return this.redis.json_set(key, path, json);
    }
}

module.exports = RedisClientService;
