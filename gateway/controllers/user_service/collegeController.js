const axios = require("axios")

async function getCollegesBySearch(req, res) {
    const searchTerm = req.query.search

    if (!searchTerm || searchTerm.length == 0) {
        res.status(400).json({error: "Search term missing or empty"})
    }

    
    try {
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getCollegesBySearch?search=${searchTerm}`);

        // no user returned
        if (!response.data) return res.status(500).send();

        return res.json(response.data);

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function getCollegeByID(req, res) {
    const id = req.query.id

    if (!id || id.length === 0) {
        return res.status(400).json({error: "ID missing or empty"})
    }

    
    try {
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getCollegeByID?id=${id}`);

        // no user returned
        if (!response.data) return res.status(500).send();

        return res.json(response.data);

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    getCollegesBySearch,
    getCollegeByID
}
