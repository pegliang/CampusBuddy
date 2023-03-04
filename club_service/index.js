const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./database/init");
require("dotenv").config();

const insertRoutes = require("./routes/insertRoutes");

const app = express();
const PORT = process.env.CLUB_SERVICE_PORT || 4004;

app.use(cors({
    origin: [process.env.NODE_ENV !== 'production' ? "*" : process.env.GATEWAY_HOST]
}));

app.use(express.json());

app.use("/", insertRoutes);

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Club Service is listening on port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
})

