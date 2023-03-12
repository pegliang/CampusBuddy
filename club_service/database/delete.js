const { Club } = require("./schema/Club");

async function deleteClubById(id) {
    try {
        await Club.deleteOne({ _id: id });
    } catch (err) {
        throw err;
    }
}

/**
 * Delete a club from the database using the given name
 * @param {string} name - the name of the club 
 */
async function deleteClubByName(name) {
    try {
        await Club.deleteOne({ name: name });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteClubById,
    deleteClubByName,
}