const { User } = require("./schema/User");

/**
 * 
 * @param {*} email the email address  
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