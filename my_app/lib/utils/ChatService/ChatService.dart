import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'Message.dart';

class ChatService {
  late IO.Socket socket;
  String chatID;
  String clientID;
  void Function(Message)? onRecieveHandler;
  void Function(List<Message>)? initialMessageHandler;

  ChatService(this.clientID, this.chatID, this.onRecieveHandler,
      this.initialMessageHandler) {
    socket = IO.io("http://localhost:4004", <String, dynamic>{
      'autoConnect': false,
      'transports': ['websocket'],
    });
    socket.connect();
    socket.onConnect((_) {
      print('Connection established');
    });
    socket.emit("joinedRoom", {"chat_id": chatID, "sender_id": clientID});

    socket.on("incomingMessage", (data) {
      if (onRecieveHandler != null) {
        onRecieveHandler!(Message.fromJSON(data));
      }
    });

    socket.on("initialMessages", (data) {
      if (initialMessageHandler != null) {
        initialMessageHandler!(Message.JsonToList(data));
      }
    });

    socket.onConnectError((err) => print("Connection Error: " + err));
    socket.onError((err) => print("Socket Error: " + err));
  }

  sendMessage(String message) {
    socket.emit("onMessage", {"message": message});
  }
}
