const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set({ strictQuery: true });

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Initialize the database connection
 * 
 * @throws Error if connection is not established
 * 
 * @example 
 * initDatabase().then(() => {
 * startServer();
 * }).catch(err => throw err);
 */
async function initDatabase() {
    console.log(`Initializing the database connection`);

    try {
        await mongoose.connect(DATABASE_URL);
    } catch (err) {
        console.error(`Database connection failed`);
        throw new Error(err);
    }
}

module.exports = initDatabase;
