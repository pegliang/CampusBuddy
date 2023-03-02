const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

const fullDummyData = require("./fullDummyData.json");
const partialDummyData = require("./partialDummyData.json");

let dummyId = null;

async function fetchingUserTesting() {
    describe("Testing the fetch route", async () => {
        it("Fetching the dummy user with every single field filled using their email", async () => {
            try {
                const res = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoByEmail?email=${fullDummyData.email}`);

                const data = res.data;

                // assert that id exists
                assert.ok(data.id !== undefined || data.id !== null || data.id !== "");

                dummyId = data.id;

                // assert name
                assert.equal(fullDummyData.name, data.name);

                // assert email
                assert.equal(fullDummyData.email, data.email);

                // assert college name
                assert.equal(fullDummyData.college_name, data.college_name);

                // assert gender
                assert.equal(fullDummyData.gender, data.gender);

                // assert race
                assert.equal(fullDummyData.race, data.race);

                // assert sexual ort
                assert.equal(fullDummyData.sexual_orientation, data.sexual_orientation);

                // assert majors
                assert.equal(JSON.stringify(fullDummyData.majors), JSON.stringify(data.majors));

                // assert minors
                assert.equal(JSON.stringify(fullDummyData.minors), JSON.stringify(data.minors));

                // assert gpa
                assert.equal(fullDummyData.gpa, data.gpa);

                // assert year
                assert.equal(fullDummyData.year, data.year);

                // assert courses
                assert.equal(JSON.stringify(fullDummyData.courses), JSON.stringify(data.courses));

                // assert profile img
                assert.equal(fullDummyData.profile_img, data.profile_img);

                // assert desc
                assert.equal(fullDummyData.desc, data.desc);

                // assert interests
                assert.equal(fullDummyData.interests[0], data.interests[0]);
                assert.equal(fullDummyData.interests[1], data.interests[1]);

                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the dummy user with every single field filled using their id", async () => {
            try {
                const res = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoById?id=${dummyId}`);

                const data = res.data;

                // assert that id exists
                assert.ok(data.id !== undefined || data.id !== null || data.id !== "");

                dummyId = data.id;

                // assert name
                assert.equal(fullDummyData.name, data.name);

                // assert email
                assert.equal(fullDummyData.email, data.email);

                // assert college name
                assert.equal(fullDummyData.college_name, data.college_name);

                // assert gender
                assert.equal(fullDummyData.gender, data.gender);

                // assert race
                assert.equal(fullDummyData.race, data.race);

                // assert sexual ort
                assert.equal(fullDummyData.sexual_orientation, data.sexual_orientation);

                // assert majors
                assert.equal(JSON.stringify(fullDummyData.majors), JSON.stringify(data.majors));

                // assert minors
                assert.equal(JSON.stringify(fullDummyData.minors), JSON.stringify(data.minors));

                // assert gpa
                assert.equal(fullDummyData.gpa, data.gpa);

                // assert year
                assert.equal(fullDummyData.year, data.year);

                // assert courses
                assert.equal(JSON.stringify(fullDummyData.courses), JSON.stringify(data.courses));

                // assert profile img
                assert.equal(fullDummyData.profile_img, data.profile_img);

                // assert desc
                assert.equal(fullDummyData.desc, data.desc);

                // assert interests
                assert.equal(fullDummyData.interests[0].name, data.interests[0].name);
                assert.equal(fullDummyData.interests[0].rank, data.interests[0].rank);
                assert.equal(fullDummyData.interests[1].name, data.interests[1].name);
                assert.equal(fullDummyData.interests[1].rank, data.interests[1].rank);


                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the dummy user with ONLY required field filled using their email", async () => {
            try {
                const res = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoByEmail?email=${partialDummyData.email}`);

                const data = res.data;

                assert.ok(data.id !== undefined || data.id !== null || data.id !== "");

                dummyId = data.id;

                // assert name
                assert.equal(partialDummyData.name, data.name);

                // assert email
                assert.equal(partialDummyData.email, data.email);

                // assert college name
                assert.equal(partialDummyData.college_name, data.college_name);

                // assert gender
                assert.equal(null, data.gender);

                // assert race
                assert.equal(null, data.race);

                // assert sexual ort
                assert.equal(null, data.sexual_orientation);

                // assert majors
                assert.equal(JSON.stringify([]), JSON.stringify(data.majors));

                // assert minors
                assert.equal(JSON.stringify([]), JSON.stringify(data.minors));

                // assert gpa
                assert.equal(null, data.gpa);

                // assert year
                assert.equal(null, data.year);

                // assert courses
                assert.equal(JSON.stringify([]), JSON.stringify(data.courses));

                // assert profile img
                assert.equal(partialDummyData.profile_img, data.profile_img);

                // assert desc
                assert.equal(null, data.desc);

                // assert interests
                assert.equal(JSON.stringify([]), JSON.stringify(data.interests));

                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }

        });

        it("Fetching the dummy user with ONLY required field filled using their id", async () => {
            try {
                const res = await axios.get(process.env.USER_SERVICE_HOST + `/getUserAccountInfoById?id=${dummyId}`);

                const data = res.data;

                // assert name
                assert.equal(partialDummyData.name, data.name);

                // assert email
                assert.equal(partialDummyData.email, data.email);

                // assert college name
                assert.equal(partialDummyData.college_name, data.college_name);

                // assert gender
                assert.equal(null, data.gender);

                // assert race
                assert.equal(null, data.race);

                // assert sexual ort
                assert.equal(null, data.sexual_orientation);

                // assert majors
                assert.equal(JSON.stringify([]), JSON.stringify(data.majors));

                // assert minors
                assert.equal(JSON.stringify([]), JSON.stringify(data.minors));

                // assert gpa
                assert.equal(null, data.gpa);

                // assert year
                assert.equal(null, data.year);

                // assert courses
                assert.equal(JSON.stringify([]), JSON.stringify(data.courses));

                // assert profile img
                assert.equal(partialDummyData.profile_img, data.profile_img);

                // assert desc
                assert.equal(null, data.desc);

                // assert interests
                assert.equal(JSON.stringify([]), JSON.stringify(data.interests));

                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = {
    fetchingUserTesting,
}