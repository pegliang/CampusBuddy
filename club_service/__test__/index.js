const { initializationTest } = require("./init");
const { registerTest } = require("./register");
const { fetchTest } = require("./fetch");
const { deletionTest } = require("./delete");


async function startUnitTest() {
    await initializationTest();
    await registerTest();
    await fetchTest();
    await deletionTest();
}

startUnitTest();