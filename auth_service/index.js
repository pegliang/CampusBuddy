const express = require("express");
const router = require("./router");
const cors = require("cors");
const { init } = require("./database");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4003;

app.use(cors({
    origin: [process.env.NODE_ENV !== 'production' ? "*" : process.env.GATEWAY_HOST]
}));

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => res.send());

// start the redis server and the auth service
init().then(() => {
    console.log(`Redis Connection established`);
    app.listen(PORT, () => console.log(`Auth Service is running on port ${PORT}`));
}).catch(err => {
    console.log(`Redis Connection failed`);
    console.error(err);
});