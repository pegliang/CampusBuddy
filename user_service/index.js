const express = require('express');
require("dotenv").config({
    path: "../.env"
});

const app = express();

app.use(express.json());

app.listen(4001, () => console.log(`Server listening on port 4001`));


