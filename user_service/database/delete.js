const { User } = require("./schema/User");

/**
 * Delete a user from the database using the given email
 * @param {*} email the email address  
 * @throws {Error} database error
 */
async function deleteUserByEmail(email) {
    try {
        await User.deleteOne({ email: email });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteUserByEmail,
}