const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyUser = require("./dummyUser.json");
const dummyClub = require("./dummyClub.json");
const dummyEvent = require("./dummyEvent.json");
const dummyMember = require("./dummyMember.json");

let clubId = null;
let userId = null;
let accessToken = null;
let refreshToken = null;

let userMemberId = null;
let accessTokenMember = null;
let refreshTokenMember = null;

let eventId = null;

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

    describe("Testing adding events", async () => {
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

        it("Create a dummy event", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/club/createEvent", {
                    name: dummyEvent.name,
                    desc: dummyEvent.desc,
                    startDate: dummyEvent.startDate,
                    endDate: dummyEvent.endDate,
                    clubId
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

        it("Check to make sure that the event exists", async () => {
            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/club/getEventByName?name=${dummyEvent.name}&clubId=${clubId}`);

                if (!res || !res.data) return assert.fail("No data returned");

                const data = res.data;

                assert.equal(data.name, dummyEvent.name);
                assert.equal(data.desc, dummyEvent.desc);
                assert.equal(data.startDate, new Date(dummyEvent.startDate).toISOString());
                assert.equal(data.endDate, new Date(dummyEvent.endDate).toISOString());
                assert.equal(data.members.length, 0);

            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

async function eventsClubTest() {
    describe("Testing the events routes", async () => {
        it("Create a new user that is going to be a member of the dummy club", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/register", {
                    name: dummyMember.name,
                    email: dummyMember.email,
                    password: dummyMember.password,
                    college_name: dummyMember.college_name,
                    profile_img: dummyMember.profile_img,
                });

            } catch (err) {
                assert.equal(err.response.status, 409);
            }
        });

        it("Login the dummy user to grab its access and refresh token", async () => {
            try {
                const res = await axios.post(process.env.GATEWAY_HOST + "/user/login", {
                    email: dummyMember.email,
                    password: dummyMember.password
                });

                if (!res.data || !res.data.accessToken || !res.data.refreshToken) {
                    assert.fail("No access token and/or refresh token");
                }

                if (!res.data.id) assert.fail("No id provided");

                accessTokenMember = res.data.accessToken;
                refreshTokenMember = res.data.refreshToken;
                userMemberId = res.data.id;

            } catch (err) {
                assert.equal(err.response.status, 409);
            }
        });

        it("Join the dummy club", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/club/joinClub", {
                    userId: userMemberId,
                    username: dummyMember.name,
                    clubId,
                }, {
                    headers: {
                        Authorization: `Bearer ${accessTokenMember}`,
                        refreshToken: `${refreshTokenMember}`
                    }
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to see if the user is a member of the club", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/club/checkUserOfMember", {
                    userId: userMemberId,
                    clubId,
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Get the event id", async () => {
            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/club/getEventByName?name=${dummyEvent.name}&clubId=${clubId}`);

                if (!res.data) return assert.fail("No data returned");

                assert.ok(res.data._id);
                eventId = res.data._id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Join the event", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + `/club/rsvpEvent`, {
                    clubId, userId: userMemberId, eventId
                }, {
                    headers: {
                        Authorization: `Bearer ${accessTokenMember}`,
                        refreshToken: `${refreshTokenMember}`
                    }
                });
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to see if the user is in the event", async () => {
            try {
                const res = await axios.get(process.env.GATEWAY_HOST + `/club/getEventByName?name=${dummyEvent.name}&clubId=${clubId}`);

                if (!res.data) return assert.fail("No data returned");

                const data = res.data;

                assert.ok(data._id);

                // rsvp should only have 1 person
                assert.equal(data.members.length, 1);

                assert.equal(data.members[0], userMemberId);

            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

async function deletionClubTest() {
    describe("Testing the deletion routes", async () => {
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

        it("Sign out the other dummy user", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/logout", {
                    email: dummyMember.email
                }, {
                    headers: {
                        Authorization: `Bearer ${accessTokenMember}`,
                        refreshToken: `${refreshTokenMember}`
                    }
                });

            } catch (err) {
                assert.fail(err);
            }
        });

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

        it("Delete the other dummy user", async () => {
            try {
                await axios.delete(process.env.GATEWAY_HOST + `/user/deleteUserByEmail?email=${dummyMember.email}`, {
                    headers: {
                        Authorization: `Bearer ${accessTokenMember}`,
                        refreshToken: `${refreshTokenMember}`
                    },
                });
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    fetchAndDeleteClubTest,
    eventsClubTest,
    deletionClubTest,
}