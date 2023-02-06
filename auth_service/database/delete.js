const { redisClient } = require("./init");

/**
 * Delete a refresh token from the cache
 * @param {string} userId the id of the user
 * @param {string} refreshToken the refresh token
 */
async function deleteRefreshTokenFromCache(userId, refreshToken) {
    try {
        await redisClient.SREM(userId, refreshToken);
    } catch (err) {
        throw err;
    }
}

/**
 * Delete all refresh tokens from a user
 * @param {string} userId the id of the user
 */
async function deleteAllRefreshTokensFromCache(userId) {
    try {
        await redisClient.DEL(userId);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteRefreshTokenFromCache,
    deleteAllRefreshTokensFromCache
}