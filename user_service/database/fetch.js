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
 * Fetch user with the given email
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

/**
 * Fetch user with the given id
 * @param {string} id the user id 
 * @returns the user if the id exists, null otherwise
 */
async function fetchUserById(id) {
    try {
        const user = await User.findById(id);
        return user === null ? null : user;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchUserByEmail,
    fetchUserById,
    _fetchAllUsers,
}