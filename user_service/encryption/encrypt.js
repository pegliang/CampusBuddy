const bcrypt = require("bcryptjs");


function _generateSalt(saltValue = 10) {
    return bcrypt.genSaltSync(saltValue);
}

/**
 * Encrypt the given password using bcrypt
 * @param {*} password the user password 
 * @returns the encrypted password
 */
function encryptPassword(password) {
    const salt = _generateSalt();
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    encryptPassword,
}