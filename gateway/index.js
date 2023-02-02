const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRoutes = require("./routes/userServiceRoutes");

const PORT = process.env.GATEWAY_PORT || 4000;

app.use(cors({
    origin : ["*"]
}));
app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req, res) => res.send());

app.listen(PORT, () => {
    console.log(`API Gateway is listening on port ${PORT}`);
});