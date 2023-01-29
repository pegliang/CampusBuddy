const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

async function loginUserTesting() {
    describe("Testing the login route", async () => {
        it("Logging in the dummy user with every single field filled", async () => {
            try {
                const res = await axios.post(process.env.USER_SERVICE_HOST + "/login", {
                    email: fullDummyData.email,
                    password: fullDummyData.password
                });

                // check to make sure if the access token and refresh token exists in the response object
                assert.ok(res.data.accessToken);
                assert.ok(res.data.refreshToken);

                // check to make sure if the id exists in the response object
                assert.ok(res.data.id);

                // check to make sure that the email matches the dummy email
                assert.ok(res.data.email === fullDummyData.email);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Logging in the dummy user with ONLY the required field filled", async () => {
            try {
                const res = await axios.post(process.env.USER_SERVICE_HOST + "/login", {
                    email: partialDummyData.email,
                    password: partialDummyData.password
                });

                // check to make sure if the access token and refresh token exists in the response object
                assert.ok(res.data.accessToken);
                assert.ok(res.data.refreshToken);

                // check to make sure if the id exists in the response object
                assert.ok(res.data.id);

                // check to make sure that the email matches the email
                assert.ok(res.data.email === partialDummyData.email);
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    loginUserTesting,
}