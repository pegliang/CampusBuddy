const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

async function initializationTest() {
    describe("Initialization Test", async () => {
        it(`Ping the club service hosting at ${process.env.CLUB_SERVICE_HOST}`, async () => {
            try {
                await axios.get(process.env.CLUB_SERVICE_HOST);
            } catch (err) {
                return assert.fail(err);
            }
        })
    })
}

module.exports = {
    initializationTest,
}