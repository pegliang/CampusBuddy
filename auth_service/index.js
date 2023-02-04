const express = require("express");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4003;

app.use(cors({
    origin: [process.env.NODE_ENV !== 'production' ? "*" : process.env.GATEWAY_HOST]
}));
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => res.send());

app.listen(PORT, () => console.log(`Auth Service is running on port ${PORT}`));