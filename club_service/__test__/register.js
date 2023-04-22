const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyClub = require("./dummyClub.json");
const dummyUser = require("./dummyUser.json");

async function registerTest() {
    let clubId = null;

    describe("Testing the register routes", async () => {
        it("Create a new dummy club using the /register route", async () => {
            try {
                await axios.post(process.env.CLUB_SERVICE_HOST + "/register", dummyClub);
            } catch (err) {
                return assert.fail(err);
            }
        });

        it("Grab the club's id", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubByName?name=${dummyClub.name.replace(" ", "%20")}`);
                const data = res.data;

                if (!data) return assert.fail("No data was returned");
                clubId = data._id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Add a dummy user to the new dummy club using the /joinClub route", async () => {
            try {
                await axios.post(process.env.CLUB_SERVICE_HOST + "/joinClub", {
                    userId: dummyUser.userId,
                    username: dummyUser.name,
                    clubId,
                });

            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    registerTest
}