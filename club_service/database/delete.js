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

async function leaveClub(clubId, userId) {
    try {
        const club = await Club.findById(clubId);
        if (club === null) throw new Error("Cannot find the club");

        const newMembersList = club.members.filter((user) => user.userId !== userId);

        club.members = newMembersList;

        await club.save();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteClubById,
    deleteClubByName,
    leaveClub,
}