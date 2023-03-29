const { User } = require("./schema/User");

async function verifyEmailToken(email, token) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("Couldn't find a user with email");

        if (user.verifyEmailToken === token) {
            user.verifiedEmail = true;
            await user.save();
            return true;
        }

        return false;
    } catch (err) {
        throw err;
    }

}

module.exports = {
    verifyEmailToken,
}