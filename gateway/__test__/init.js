const axios = require('axios');
const assert = require('assert');
require("dotenv").config();

async function initializationTest() {
    describe("Initialization Testing", async () => {
        it(`Checking to make sure that the API Gateway is been up at ${process.env.GATEWAY_HOST}`, async () => {
            try {
                await axios.get(process.env.GATEWAY_HOST);
            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    initializationTest,
}