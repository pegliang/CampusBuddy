const { initializationTesting } = require("./init");
const { registerUserTesting } = require("./register");
const { fetchingUserTesting } = require("./fetch");
const { deleteUserTesting } = require("./delete");
const { loginUserTesting } = require("./login");

async function startUserServiceTest() {
    await initializationTesting();
    await registerUserTesting();
    await fetchingUserTesting();
    await loginUserTesting();
    await deleteUserTesting();
}

startUserServiceTest();

