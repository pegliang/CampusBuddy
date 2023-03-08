const Redis = require('redis');
require("dotenv").config();

const redisClient = Redis.createClient({
    url: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

/**
 * Start the redis server
 */
async function init() {
    try {
        await redisClient.connect();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    init,
    redisClient,
}