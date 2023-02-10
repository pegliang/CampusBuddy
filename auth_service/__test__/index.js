const { initializationTest } = require("./init");
const { verifyTokensTest } = require("./verify");

async function startUnitTest() {
    await initializationTest();
    await verifyTokensTest();
}

startUnitTest();