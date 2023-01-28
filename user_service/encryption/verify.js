const bcrypt = require('bcryptjs');

/**
 * Verify if the given password match the encrypted password
 * @param {string} encryptedPassword the encrypted password 
 * @param {string} givenPassword the user given password
 * @returns {boolean} true if the password matches false otherwise
 */
function verifyPassword(encryptedPassword, givenPassword) {
    return bcrypt.compareSync(givenPassword, encryptedPassword);
}

module.exports = {
    verifyPassword,
}