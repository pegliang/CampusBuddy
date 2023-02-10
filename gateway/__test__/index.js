const { initializationTest } = require("./init");
const userServiceTest = require("./user_service");

async function startUnitTest() {
    await initializationTest();

    // user service test
    await userServiceTest.userServiceRegisterTest();
    await userServiceTest.userServiceFetchUserTest();
}

startUnitTest();