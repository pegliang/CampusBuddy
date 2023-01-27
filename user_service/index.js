const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
require("dotenv").config();

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 4001;

app.use(express.json());

// dev only: allow access from anywhere
// production only: only allow access from the frontend host
app.use(cors({
    origin: [process.env.NODE_ENV !== 'production' ? "*" : process.env.FRONTEND_HOSt]
}));

// initialize the database and if it is successful, start the server
initDatabase().then(() => {
    console.log(`Database connection established`);
    app.listen(PORT, () => console.log(`User Service listening on ${PORT}`));
}).catch(err => {
    console.error(`Failed to start user service due to a database connection error`);
    console.error(err);
});