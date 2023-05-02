const { default: axios } = require("axios");
require("dotenv").config();

async function swipe(req, res) {

    try {
        const originalUrl = req.originalUrl;
        console.log(process.env.MATCHING_SERVICE_HOST + originalUrl.replace("/matching", ""))
        const response = await axios.post(process.env.MATCHING_SERVICE_HOST + originalUrl.replace("/matching", ""), {
            validateStatus: () => true,
            data: req.body
        });

        if (!response.data) return res.status(500).json({message: "No Response Data"});
        console.log(response)
        return res.status(response.status).json(response.data);
    } catch (err) {
        return res.status(500).json({message: "Internal Server error"});
    }
}

module.exports = {
    swipe
}