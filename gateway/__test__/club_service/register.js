const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyUser = require("./dummyUser.json");
const dummyClub = require("./dummyClub.json");

let accessToken = null;
let refreshToken = null;

let userId = null;

async function registerClubTest() {
    describe("Testing the /register route", async () => {
        it("Create a dummy user", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/register", {
                    name: dummyUser.name,
                    email: dummyUser.email,
                    password: dummyUser.password,
                    college_name: dummyUser.college_name,
                    profile_img: dummyUser.profile_img,
                });

            } catch (err) {
                assert.equal(err.response.status, 409);
            }
        });

        it("Login the dummy user to grab its access and refresh token", async () => {
            try {
                const res = await axios.post(process.env.GATEWAY_HOST + "/user/login", {
                    email: dummyUser.email,
                    password: dummyUser.password
                });

                if (!res.data || !res.data.accessToken || !res.data.refreshToken) {
                    assert.fail("No access token and/or refresh token");
                }

                if (!res.data.id) assert.fail("No id provided");

                accessToken = res.data.accessToken;
                refreshToken = res.data.refreshToken;
                userId = res.data.id;

            } catch (err) {
                assert.equal(err.response.status, 409);
            }
        });

        it("Using the dummy user to create a dummy club", async () => {
            if (!accessToken || !refreshToken) assert.fail("No access token or refresh token was provided");
            if (!userId) assert.fail("No id was provided");
            try {
                await axios.post(process.env.GATEWAY_HOST + "/club/register", {
                    userId,
                    username: dummyUser.name,
                    title: "president",
                    clubName: dummyClub.clubName,
                    majors: dummyClub.majors,
                    minors: dummyClub.minors,
                    genders: dummyClub.genders,
                    races: dummyClub.races,
                    sexual_orientations: dummyClub.sexual_orientations,
                    desc: dummyClub.desc
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `${refreshToken}`
                    }
                });

            } catch (err) {
                assert.equal(err.response.status, 409);
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
    });
}

module.exports = {
    registerClubTest,
}