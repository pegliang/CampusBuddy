const { initializationTest } = require("./init");
const userServiceTest = require("./user_service");
const clubServiceTest = require("./club_service");


async function startUnitTest() {
    await initializationTest();

    // user service test
    await userServiceTest.userServiceRegisterTest();
    await userServiceTest.userServiceFetchUserTest();
    await userServiceTest.userServiceLoginAndDeleteTest();

    // club service test
    await clubServiceTest.registerClubTest();
    await clubServiceTest.fetchAndDeleteClubTest();
    await clubServiceTest.eventsClubTest();
    await clubServiceTest.deletionClubTest();
}

startUnitTest();