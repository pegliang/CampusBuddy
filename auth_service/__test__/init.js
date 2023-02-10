const assert = require('assert');
const axios = require("axios");
require("dotenv").config();

async function initializationTest() {
    describe("Initialization Testing", () => {
        it(`Testing to make sure that the Auth Service is up at ${process.env.AUTH_SERVICE_HOST}`, async () => {
            try {
                await axios.get(process.env.AUTH_SERVICE_HOST);
            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    initializationTest,
}