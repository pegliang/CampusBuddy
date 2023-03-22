const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require("dotenv").config();

const PORT = process.env.PORT || 4005;

io.on('connection', (socket) => {
    console.log(`connection established`);
    // when the user click the message window, socket should connect
    // if the user clicked on a certain user, join the room
    let conversationID = null;
    socket.on('joinedRoom', (data) => {
        if (!data.id) return;
        conversationID = data.id
        socket.join(conversationID);
        console.log(`Successfully joined room: ${conversationID}`);
    });

    socket.on("onMessage", (data) => {
        if (!data.message) return;
        socket.to(conversationID).emit("incomingMessage", data.message);
        console.log(`Successfully send message: ${data.message}`);
    });
});

server.listen(PORT, () => {
    console.log(`Message service listening on PORT ${PORT}`);
});