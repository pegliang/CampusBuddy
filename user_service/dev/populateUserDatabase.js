const db = require("../database");
const {createNRandomUsers} = require("ccnyrandomusergenerator")
const {encryptPassword } = require("../encryption");


async function insertNRandomUsers(n) {
    randomUsers = createNRandomUsers(n)
    for (let i = 0; i < n; i ++) {
        try {
            const {name, email, password, college, gender, race,
                   sexual_orientation, majors, minors, gpa, year,
                   courses, clubs, interests} = randomUsers[i]
            await db.insertUser({
                name, email, password: encryptPassword(password), college_name: college, gender, race, sexual_orientation,
                majors, minors, gpa, year, courses, clubs, profile_img: "https://google.com", desc: "Random Description", interests,
            });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = {
    insertNRandomUsers
}