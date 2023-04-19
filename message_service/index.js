const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {Match} = require("./Database/Models/Match");
const {Message} = require("./Database/Models/Message");
const mongoose = require("mongoose")

const PORT = process.env.PORT || 4005;

require("dotenv").config();
require("./Database/database_init")()
.then(() => {
    console.log("Database Connected!");
    server.listen(PORT, () => {
        console.log(`Message service listening on PORT ${PORT}`);
    });
})
.catch((err) => {
    console.log("Something went wrong connecting to the database!");
})

io.on('connection', (socket) => {
    console.log(`connection established`);

    // when the user click the message window, socket should connect
    // if the user clicked on a certain user, join the room
    let clientInfo = {testing: "hi"};
    socket.on('joinedRoom', async (data) => {
        console.log("JOINEDROOM DATA", data);
        if (!data.chat_id || !data.sender_id) return;
        clientInfo.chat_id = data.chat_id;
        clientInfo.sender_id = data.sender_id;
        console.log("JOINED ROOM CLIENTINFO", clientInfo)
        const match = await Match.findById(clientInfo.chat_id);


        if (match === null) {
            socket.emit("error", `Could not find chat with id '${clientInfo.chat_id}'`);
            socket.close();
            return;
        }
        console.log(match, match["Conversation_Active_For_User_1"]);
        user1 = match["User_1_ID"].toString();
        user2 = match["User_2_ID"].toString();
        if (clientInfo.sender_id == user1) {
            clientInfo.recipient_id = user2;
        } else if (clientInfo.sender_id == user2) {
            clientInfo.recipient_id = user1;
        } else {
            socket.emit("error", "User is not apart of this conversation.");
            socket.disconnect(true)
            return;
        }

        socket.join( clientInfo.chat_id);

        const messages = await Message.find({chatID: clientInfo.chat_id});
        console.log(messages)
        socket.emit("initialMessages", messages);
    });

    socket.on("onMessage", async (data) => {
        if (!data.message || !data.chat_id) return;
        console.log("CLIENT INFO: ", clientInfo)
        const message = new Message({
            chatID: clientInfo.chat_id,
            sender_id: clientInfo.sender_id,
            recipient_id: clientInfo.recipient_id,
            content: data.message,
            timestamp: Date.now()
        });
        try {
            await message.save();
            socket.to(clientInfo.chat_id).emit("incomingMessage", message);
        }
        catch (err) {
            console.error(err);
            socket.emit("error", `Could not save message`);
        }
        console.log(`Successfully send message: ${data.message}`);
    });
});