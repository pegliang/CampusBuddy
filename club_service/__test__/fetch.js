const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyClub = require("./dummyClub.json");

async function fetchTest() {
    describe("Testing the fetch route", async () => {
        it("Fetch the dummy club using the /getClubByName route", async () => {
            try {
                const res = await axios.get(process.env.CLUB_SERVICE_HOST + `/getClubByName?name=${dummyClub.name}`);
                const data = res.data;

                if (!data) return assert.fail("No data was returned");

                assert.equal(data.name, dummyClub.name);
                assert.equal(JSON.stringify(data.majors), JSON.stringify(dummyClub.majors));
                assert.equal(JSON.stringify(data.minors), JSON.stringify(dummyClub.minors));
                assert.equal(JSON.stringify(data.genders), JSON.stringify(dummyClub.genders));
                assert.equal(JSON.stringify(data.races), JSON.stringify(dummyClub.races));
                assert.equal(JSON.stringify(data.sexual_orientations), JSON.stringify(dummyClub.sexual_orientations));
                assert.equal(data.desc, dummyClub.desc);

                // verify all eboard members
                for (let i = 0; i < dummyClub.eboard_members.length; i++) {
                    assert.equal(dummyClub.eboard_members[i].name, data.eboard_members[i].name);
                    assert.equal(dummyClub.eboard_members[i].title, data.eboard_members[i].title);
                    assert.equal(dummyClub.eboard_members[i].userId, data.eboard_members[i].userId);
                }

                // verify all members
                for (let i = 0; i < dummyClub.members.length; i++) {
                    assert.equal(dummyClub.members[i].name, data.members[i].name);
                    assert.equal(dummyClub.members[i].userId, data.members[i].userId);
                }

            } catch (err) {
                return assert.fail(err);
            }
        });
    })
}

module.exports = {
    fetchTest
}