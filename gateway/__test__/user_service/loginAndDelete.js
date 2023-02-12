const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

let fullDummyId = null;
let partialDummyId = null;

let accessToken = null;

async function userServiceLoginAndDeleteTest() {
    describe("User Service: Testing the login route", () => {
        it("Testing the login route with the first user", async () => {
            try {
                const res = await axios.post(process.env.GATEWAY_HOST + `/user/login`, { email: fullDummyData.email, password: fullDummyData.password }, { withCredentials: true });

                if (!res || !res.data) return assert.fail("No response from server");

                // store the user id
                fullDummyId = res.data.id;

                // get the access token
                accessToken = res.data.accessToken;

                if (!accessToken) return assert.fail("No access token");

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Testing the delete route with the first user", async () => {
            try {
                await axios.delete(process.env.GATEWAY_HOST + `/user/deleteUserByEmail?email=${fullDummyData.email}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
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