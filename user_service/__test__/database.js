const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

const fullDummyData = {
    name: "Joe Dummy Doe",
    email: "joeDummyDoe@sample.university.edu",
    password: "dummyPassword123",
    college_name: "Sample University",
    gender: "Male",
    race: "White",
    sexual_orientation: "Straight",
    majors: ["Computer Science"],
    minors: ["English", "Philosophy"],
    gpa: 3.8,
    year: "Junior",
    courses: ["18381", "129183", "13818", "18313"],
    clubs: ["Sample Club A", "Sample Club B"],
    profile_img: "https://google.com",
    desc: "My Sample Description",
    interests: ["Sample Interest A", "Sample Interest B"]

}

const partialDummyData = {
    name: "Joe Dummy Doe",
    email: "joeDummyDoe@sample.university.edu",
    password: "dummyPassword123",
    college_name: "Sample University",
    profile_img: "https://google.com",
}

let dummyId = null;

async function addingFetchingAndDeletingFromDatabaseTest() {
    describe("Testing the user database", () => {
        it("Adding a dummy user into the database", async () => {
            const registerRequest = fullDummyData;

            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", { registerRequest });
            } catch (err) {
                assert.fail(err);
            }

        });

        it("Fetching the dummy user data using its email address", async () => {
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
                assert.equal(JSON.stringify(fullDummyData.interests), JSON.stringify(data.interests));

                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the dummy user data using its id", async () => {
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
                assert.equal(JSON.stringify(fullDummyData.interests), JSON.stringify(data.interests));

                // assert verified email
                assert.equal(false, data.verifiedEmail);

                // assert isPremiumMember
                assert.equal(false, data.isPremiumMember);

            } catch (err) {
                assert.fail(err);
            }
        })

        it("Deleting the dummy user using the DELETE email route", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail?email=${fullDummyData.email}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Adding a new dummy user with ONLY the required fields", async () => {
            const registerRequest = partialDummyData;

            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", { registerRequest });
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetching the partial dummy user using their email", async () => {
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

        it("Fetching the partial dummy user using their id", async () => {
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
        })

        it("Removing the partial dummy user using the DELETE email route", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail?email=${partialDummyData.email}`);
            } catch (err) {
                assert.fail(err);
            }
        });
    })
}

module.exports = {
    addingFetchingAndDeletingFromDatabaseTest,
}