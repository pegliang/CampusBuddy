const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

let fullDummyId = null;
let partialDummyId = null;

let accessToken = null;
let refreshToken = null;

async function userServiceLoginAndDeleteTest() {
    describe("User Service: Testing the login route", () => {
        it("Testing the login route with the first user", async () => {
            try {
                const res = await axios.post(process.env.GATEWAY_HOST + `/user/login`, { email: fullDummyData.email, password: fullDummyData.password }, { withCredentials: true });

                if (!res || !res.data) return assert.fail("No response from server");

                // store the user id
                fullDummyId = res.data.id;

                // get the access token and refresh token
                accessToken = res.data.accessToken;
                refreshToken = res.data.refreshToken;

                if (!accessToken || !refreshToken) return assert.fail("No access token");

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Testing the delete route with the first user", async () => {
            try {
                await axios.delete(process.env.GATEWAY_HOST + `/user/deleteUserByEmail?email=${fullDummyData.email}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `${refreshToken}`
                    },
                    withCredentials: true,
                });
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    userServiceLoginAndDeleteTest,
}