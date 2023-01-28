const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

describe("Initialization Testing", () => {
    it(`Testing to make sure that the User Service is up at ${process.env.USER_SERVICE_HOST}`, async () => {
        try {
            await axios.get(process.env.USER_SERVICE_HOST);
        } catch (err) {
            assert.fail(err);
        }
    });
});
