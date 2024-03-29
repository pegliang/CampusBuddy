const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userServiceRoutes");
const matchingRoutes = require("./routes/matchingServiceRoutes");
const clubRoutes = require("./routes/clubServiceRoutes");

const PORT = process.env.GATEWAY_PORT || 4000;

app.use(cookieParser());

app.use(cors({
    origin: ["*"],
    credentials: true
}));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/matching", matchingRoutes);
app.use("/club", clubRoutes);


app.get("/", (req, res) => res.send());

app.listen(PORT, () => {
    console.log(`API Gateway is listening on port ${PORT}`);
});