const jwt = require("jsonwebtoken");
const assert = require("assert");
const axios = require("axios");
const { addRefreshTokenToCache, init } = require("../database");
require("dotenv").config();

const dummyPayload = {
    id: "1234",
    name: "dummy",
    email: "dummy@example.com"
};

const waitSeconds = 5;

async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function verifyTokensTest() {
    describe("Testing access and refresh tokens", async () => {
        // create dummy access and refresh token
        const accessToken = jwt.sign(dummyPayload, process.env.JWT_SECRET_ACCESS_TOKEN_KEY, { expiresIn: "5s" });
        const refreshToken = jwt.sign(dummyPayload, process.env.JWT_SECRET_REFRESH_TOKEN_KEY, { expiresIn: "10s" });

        it("Adding the refresh token to cache", async () => {
            try {
                const res = await addRefreshTokenToCache(dummyPayload.id, refreshToken);

                assert.ok(res, "Failed to add refresh token to cache");

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Verifying that the access token is valid", async () => {
            try {
                await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken });
            } catch (err) {
                assert.fail(err);
            }
        });

        it(`Wait for ${waitSeconds} seconds for the access token to expire`, async () => sleep(waitSeconds));

        it("Access token has expired, a new access token should be returned", async () => {
            try {
                const res = await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken });

                if (!res.data || !res.data.newAccessToken) return assert.fail("No new access token from the auth server");

                jwt.verify(res.data.newAccessToken, JWT_SECRET_ACCESS_TOKEN_KEY, (err, decodedAccessToken) => {
                    if (err) return assert.fail("Invalid new access token");

                    assert.equal(dummyPayload.id, decodedAccessToken.id);
                    assert.equal(dummyPayload.name, decodedAccessToken.name);
                    assert.equal(dummyPayload.email, decodedAccessToken.email);
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it(`Wait for ${waitSeconds} seconds for the access token to expire`, async () => sleep(waitSeconds));

        it("Refresh token should has expired, seeing if the response is a 403 error code", async () => {
            try {
                await axios.post(process.env.AUTH_SERVICE_HOST + "/auth", { accessToken, refreshToken });
            } catch (err) {
                if (!err || !err.response) return assert.fail("Axios error");
                assert.equal(err.response.status, 403);
            }
        });
    });
}

module.exports = {
    verifyTokensTest,
}