const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {Match} = require("./Database/Models/Match");
const {Message} = require("./Database/Models/Message");

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

    let conversationID = null;
    let sender_id = null;
    let recipient_id = null;
    socket.on('joinedRoom', async (data) => {

        if (!data.id || !data.sender_id) return;
        conversationID = data.id;
        sender_id = data.sender_id;

        const match = await Match.findById(conversationID);


        if (match === null) {
            socket.emit("error", `Could not find chat with id '${conversationID}'`);
            socket.close();
            return;
        }

        user1 = match["user_1_id"];
        user2 = match["user_2_id"];
        if (sender_id == user1) {
            recipient_id = user2;
        } else if (sender_id == user2) {
            recipient_id = user1;
        } else {
            socket.emit("error", "User is not apart of this conversation.");
            socket.close();
            return;
        }

        socket.join(conversationID);

        const messages = await Message.find({chatID: conversationID});
        socket.emit("initialMessages", messages);
    });

    socket.on("onMessage", async (data) => {
        if (!data.message) return;
        const message = new Message({
            chatID: conversationID,
            sender_id: sender_id,
            recipient_id: recipient,
            content: data.message,
            timestamp: Date.now()
        });
        try {
            await message.save();
            socket.to(conversationID).emit("incomingMessage", data.message);
        }
        catch (err) {
            console.error(err);
            socket.emit("error", `Could not save message`);
        }
        console.log(`Successfully send message: ${data.message}`);
    });
});