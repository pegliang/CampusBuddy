const { initializationTest } = require("./init");
const { registerTest } = require("./register");
const { fetchTest } = require("./fetch");
const { deletionTest } = require("./delete");
const eventsTest = require("./events.test");

async function startUnitTest() {
    await initializationTest();
    await registerTest();
    await fetchTest();
    await eventsTest();
    await deletionTest();
}

startUnitTest();