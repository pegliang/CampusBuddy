const { initializationTesting } = require("./init");
const { addingFetchingAndDeletingFromDatabaseTest } = require("./database");


async function startUserServiceTest() {
    await initializationTesting();

    await addingFetchingAndDeletingFromDatabaseTest();
}

startUserServiceTest();

