const db = require("../database")

async function getCoursesBySearch(req, res) {
    const searchTerm = req.query.search

    if (!searchTerm || searchTerm.length === 0) {
        return res.status(400).json({error: "Search term missing or empty"})
    }
    try {
        const courses = await db.searchCourses(searchTerm)
        res.status(200).json({data: courses})
    } catch (err) {
        return res.status(500).json({error: "Something went wrong on the server"})
    }
    
}

module.exports = {
    getCoursesBySearch
}