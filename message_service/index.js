const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require("dotenv").config();

const PORT = process.env.PORT || 4005;

io.on('connection', (socket) => {
    console.log(`connection established`);
    // when the user click the message window, socket should connect
    // if the user clicked on a certain user, join the room

    socket.on('joinedRoom', (data) => {
        socket.join(data.id);
        console.log(`Successfully joined room: ${data.id}`);
    });

    socket.on("onMessage", (data) => {
        socket.to(data.id).emit("incomingMessage", data.message);
        console.log(`Successfully send message: ${data.message}`);
    });
});

server.listen(PORT, () => {
    console.log(`Message service listening on PORT ${PORT}`);
});