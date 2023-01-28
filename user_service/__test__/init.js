const assert = require("assert");
const axios = require("axios");

async function initializationTesting() {
    describe("Initialization Testing", () => {
        it(`Testing to make sure that the User Service is up at ${process.env.USER_SERVICE_HOST}`, async () => {
            try {
                await axios.get(process.env.USER_SERVICE_HOST);
                return;
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    initializationTesting,
}