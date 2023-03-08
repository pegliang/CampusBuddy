const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

async function registerUserTesting() {
    describe("Testing the register route", () => {
        it("Adding a dummy user into the database with every field filled", async () => {
            const registerRequest = fullDummyData;

            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", { registerRequest });
            } catch (err) {
                assert.fail(err);
            }

        });

        it("Adding a new dummy user with ONLY the required fields", async () => {
            const registerRequest = partialDummyData;

            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", { registerRequest });
            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    registerUserTesting,
}