const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set({ strictQuery: true });

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Connect to the database
 */
async function initDatabase() {
    try {
        await mongoose.connect(DATABASE_URL)
    } catch (err) {
        throw err;
    }
}

module.exports = {
    initDatabase,
}