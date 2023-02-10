const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

async function userServiceDeleteUserTest() {
    describe("User Service: Testing the deletion routes", () => {
        it("Deleting the first user with all fields filled", async () => {
            try {
                await axios.delete(process.env.GATEWAY_HOST + `/deleteUserByEmail?email=${fullDummyData.email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    userServiceDeleteUserTest,
}