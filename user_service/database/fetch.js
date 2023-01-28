const { User } = require("./schema/User");

/**
 * Fetch all users that is in the user database
 * 
 * @access FOR TESTING ONLY
 */
async function _fetchAllUsers() {
    try {
        const users = await User.find({});

        users.forEach(user => {
            console.log(user);
        });
    } catch (err) {
        console.error(err);
    }
}

/**
 * Check if the email address already exists
 * @param {string} email the given email 
 * @returns the user if the email exists, null otherwise
 * @throws {Error} database error
 */
async function fetchUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user === null ? null : user;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchUserByEmail,
    _fetchAllUsers,
}