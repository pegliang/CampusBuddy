import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatService {
  late IO.Socket socket;
  String chatID;
  String userID;
  void Function(String)? onRecieveHandler;

  ChatService(this.chatID, this.userID, this.onRecieveHandler) {
    socket = IO.io("https://localhost:4004");
    socket.connect();
    socket.emit("joinedRoom", {"id": chatID});
    socket.on("incomingMessage", (data) {
      if (onRecieveHandler != null) {
        onRecieveHandler!(data.message);
      }
    });
  }

  sendMessage(String message) {
    socket.emit("onMessage", {"message": message});
  }
}
