const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyClub = require("./dummyClub.json");

async function deletionTest() {
    describe("Testing the deletion route", async () => {
        it("Delete the dummy club using the /deleteClubByName route", async () => {
            try {
                await axios.delete(process.env.CLUB_SERVICE_HOST + `/deleteClubByName?name=${dummyClub.name}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetch the dummy club again and it should return a 404 response code", async () => {
            try {
                await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubByName?name=${dummyClub.name}`);
                assert.fail("Club still exist in the database");

            } catch (err) {
                const statusCode = err?.response?.status;

                if (!statusCode) return assert.fail(err);

                assert.equal(statusCode, 404);
            }
        })
    })
}

module.exports = {
    deletionTest
}