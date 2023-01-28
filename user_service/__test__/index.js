const assert = require("assert");
const axios = require("axios");
require("dotenv").config();

describe("Initialization Testing", () => {
    it(`Testing to make sure that the User Service is up at ${process.env.USER_SERVICE_HOST}`, async () => {
        try {
            await axios.get(process.env.USER_SERVICE_HOST);
        } catch (err) {
            assert.fail(err);
        }
    });
});

describe("Testing the user database", () => {
    it("Adding a dummy user into the database", async () => {
        const registerRequest = {
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
        };

        try {
            await axios.post(process.env.USER_SERVICE_HOST + "/register", registerRequest);
        } catch (err) {
            assert.fail(err);
        }
    });
})
