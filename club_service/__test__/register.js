const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyClub = require("./dummyClub.json");

async function registerTest() {
    describe("Testing the register route", async () => {
        it("Create a new dummy club using the /register route", async () => {
            try {
                await axios.post(process.env.CLUB_SERVICE_HOST + "/register", dummyClub);
            } catch (err) {
                return assert.fail(err);
            }
        });
    })
}

module.exports = {
    registerTest
}