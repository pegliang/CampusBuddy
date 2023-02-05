const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res) {
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;

    if (!accessToken || !refreshToken) return res.status(400).send();

    // decode the access token
    jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN_KEY, (err, decodedAccessToken) => {
        // access token is still valid
        if (!err) return res.json({});

        // access token is invalid
        if (!err.message.includes("expire")) return res.status(401).send();

        // check for refresh token 
        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN_KEY, (err, decodedRefreshToken) => {
            // refresh token is still valid
            if (!err) {
                const expiredAccessToken = jwt.decode(accessToken);

                // access and refresh payload must be the same 
                if (expiredAccessToken.id !== decodedRefreshToken.id ||
                    expiredAccessToken.email !== decodedRefreshToken.email ||
                    expiredAccessToken.name !== decodedRefreshToken.name) return res.status(401).send();

                // generate a new access token
                const newPayload = {
                    id: decodedRefreshToken.id,
                    name: decodedRefreshToken.name,
                    email: decodedRefreshToken.email
                };

                const newAccessToken = jwt.sign(newPayload, process.env.JWT_SECRET_ACCESS_TOKEN_KEY, { expiresIn: "5m" });

                return res.json({
                    newAccessToken,
                });
            }

            // refresh token has expired, sign the user out
            return res.status(401).send();
        });
    });

}

module.exports = {
    auth,
}