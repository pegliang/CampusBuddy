const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

async function deleteUserTesting() {
    describe("Testing the delete user route", async () => {
        it("Deleting the dummy user with every field filled using the DELETE email route", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail?email=${fullDummyData.email}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Deleting the dummy user with ONLY the required field filled using the DELETE email route", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail?email=${partialDummyData.email}`);
            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    deleteUserTesting,
}