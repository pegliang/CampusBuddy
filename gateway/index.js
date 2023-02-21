const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userServiceRoutes");
const matchingRoutes = require("./routes/matchingServiceRoutes")

const PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, () => {
    console.log('Gateway listening on port', PORT);
});

app.use(cookieParser());

app.use(cors({
    origin: ["*"],
    credentials: true
}));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/matching", matchingRoutes)

app.get("/", (req, res) => res.send());

app.listen(PORT, () => {
    console.log(`API Gateway is listening on port ${PORT}`);
});