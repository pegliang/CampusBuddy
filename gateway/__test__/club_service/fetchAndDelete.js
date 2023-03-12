const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyUser = require("./dummyUser.json");
const dummyClub = require("./dummyClub.json");

let clubId = null;
let userId = null;
let accessToken = null;
let refreshToken = null;

async function fetchAndDeleteClubTest() {
    describe("Testing the fetch route", async () => {
        it("Get the id of the dummy user", async () => {
            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/user/getUserAccountInfoByEmail?email=${dummyUser.email}`);

                if (!res || !res.data) assert.fail("No response object from server");

                userId = res.data.id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the dummy club using its name", async () => {
            const clubName = dummyClub.clubName.replace(" ", "%20");

            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/club/getClubByName?name=${clubName}`);

                if (!res || !res.data) return assert.fail("No response object returned");

                const data = res.data;

                clubId = data._id;
                assert.equal(data.name, dummyClub.clubName);
                assert.equal(JSON.stringify(data.majors), JSON.stringify(dummyClub.majors));
                assert.equal(JSON.stringify(data.majors), JSON.stringify(dummyClub.majors));
                assert.equal(JSON.stringify(data.genders), JSON.stringify(dummyClub.genders));
                assert.equal(JSON.stringify(data.races), JSON.stringify(dummyClub.races));
                assert.equal(JSON.stringify(data.sexual_orientations), JSON.stringify(dummyClub.sexual_orientations));
                assert.equal(data.desc, dummyClub.desc);

                // there should be no members
                assert.deepEqual([], data.members);

                // there should be only 1 eboard member
                assert.equal(dummyUser.name, data.eboard_members[0].name);
                assert.equal(data.eboard_members[0].userId, userId);
                assert.equal(data.eboard_members[0].title, "president");

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the dummy club using its id", async () => {
            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/club/getClubById?id=${clubId}`);

                if (!res || !res.data) return assert.fail("No response object returned");

                const data = res.data;

                assert.equal(data.name, dummyClub.clubName);
                assert.equal(JSON.stringify(data.majors), JSON.stringify(dummyClub.majors));
                assert.equal(JSON.stringify(data.majors), JSON.stringify(dummyClub.majors));
                assert.equal(JSON.stringify(data.genders), JSON.stringify(dummyClub.genders));
                assert.equal(JSON.stringify(data.races), JSON.stringify(dummyClub.races));
                assert.equal(JSON.stringify(data.sexual_orientations), JSON.stringify(dummyClub.sexual_orientations));
                assert.equal(data.desc, dummyClub.desc);

                // there should be no members
                assert.deepEqual([], data.members);

                // there should be only 1 eboard member
                assert.equal(dummyUser.name, data.eboard_members[0].name);
                assert.equal(data.eboard_members[0].userId, userId);
                assert.equal(data.eboard_members[0].title, "president");

            } catch (err) {
                assert.fail(err);
            }
        });
    });

    describe("Testing the delete route", async () => {
        it("Login the dummy user to get the access and refresh token", async () => {
            try {
                const res = await axios.post(process.env.GATEWAY_HOST + "/user/login", {
                    email: dummyUser.email,
                    password: dummyUser.password,
                });

                if (!res || !res.data) return assert.fail("No response object from server");

                userId = res.data.id;
                accessToken = res.data.accessToken;
                refreshToken = res.data.refreshToken;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Delete the dummy club", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + `/club/deleteClubById`, {
                    userId, clubId,
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `${refreshToken}`
                    }
                });
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Sign out the dummy user", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/logout", {
                    email: dummyUser.email
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `${refreshToken}`
                    }
                });

            } catch (err) {
                assert.fail(err);
            }
        })

        it("Delete the dummy user", async () => {
            try {
                await axios.delete(process.env.GATEWAY_HOST + `/user/deleteUserByEmail?email=${dummyUser.email}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `${refreshToken}`
                    },
                });
            } catch (err) {
                assert.fail(err);
            }
        })
    });
}

module.exports = {
    fetchAndDeleteClubTest,
}