const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
const {insertNRandomUsers} = require("./dev/populateUserDatabase.js")
require("dotenv").config();

const fetchRoutes = require("./routes/fetchRoutes");
const insertRoutes = require("./routes/insertRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const loginRoute = require("./routes/loginRoute");

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 4001;

// dev only: allow access from anywhere
// production only: only allow access from the gateway host
app.use(cors({
    origin: [process.env.NODE_ENV !== 'production' ? "*" : process.env.GATEWAY_HOST]
}));

app.use(express.json());
app.use("/", fetchRoutes);
app.use("/", insertRoutes);
app.use("/", deleteRoutes);
app.use("/", loginRoute);

// home route
app.get("/", (req, res) => res.send());

// initialize the database and if it is successful, start the server
initDatabase().then(() => {
    console.log(`Database connection established`);
    app.listen(PORT, () => console.log(`User Service listening on ${PORT}`));
    // While in development generate process.env.GENERATE_TEST_USERS users (Default is 0 test users)
    if (process.env.NODE_ENV == "development") {
        insertNRandomUsers(process.env.GENERATE_TEST_USERS || 0)
    }
}).catch(err => {
    console.error(`Failed to start user service due to a database connection error`);
    console.error(err);
});