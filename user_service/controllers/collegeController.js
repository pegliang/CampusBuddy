const db = require("../database")

async function getCollegeBySearch(req, res) {
    const searchTerm = req.query.search

    if (!searchTerm || searchTerm.length === 0) {
        return res.status(400).json({error: "Search term missing or empty"})
    }
    try {
        const colleges = await db.searchByCollegeName(searchTerm)
        res.status(200).json({data: colleges})
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on the server"})
    }
    
}

async function getCollegeByID(req, res) {
    const id = req.query.id

    if (!id || id.length === 0) {
        return res.status(400).json({error: "ID missing or empty"})
    }
    try {
        const college = await db.getCollegeByID(id)
        res.status(200).json({data: college})
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on the server"})
    }
    
}

module.exports = {
    getCollegeByID,
    getCollegeBySearch
}