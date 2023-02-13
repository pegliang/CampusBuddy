const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

async function userServiceRegisterTest() {
    describe("User Service: Testing the register routes", () => {
        it("Registering a new user with all fields filled", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/register", {
                    name: fullDummyData.name,
                    email: fullDummyData.email,
                    password: fullDummyData.password,
                    college_name: fullDummyData.college_name,
                    gender: fullDummyData.gender,
                    race: fullDummyData.race,
                    sexual_orientation: fullDummyData.sexual_orientation,
                    majors: fullDummyData.majors,
                    minors: fullDummyData.minors,
                    gpa: fullDummyData.gpa,
                    year: fullDummyData.year,
                    courses: fullDummyData.courses,
                    clubs: fullDummyData.clubs,
                    profile_img: fullDummyData.profile_img,
                    desc: fullDummyData.desc,
                    interests: fullDummyData.interests,
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Registering a new user with only the required fields", async () => {
            try {
                await axios.post(process.env.GATEWAY_HOST + "/user/register", {
                    name: partialDummyData.name,
                    email: partialDummyData.email,
                    password: partialDummyData.password,
                    college_name: partialDummyData.college_name,
                    profile_img: partialDummyData.profile_img,
                });

            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    userServiceRegisterTest,
}
