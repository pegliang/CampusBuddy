import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatService {
  late IO.Socket socket;
  String chatID;
  void Function(String)? onRecieveHandler;

  ChatService(this.chatID, this.onRecieveHandler) {
    socket = IO.io("http://localhost:4004", <String, dynamic>{
      'autoConnect': false,
      'transports': ['websocket'],
    });
    socket.connect();
    socket.onConnect((_) {
      print('Connection established');
    });
    socket.emit("joinedRoom", {"id": chatID});
    socket.on("incomingMessage", (data) {
      print("recieve message");
      if (onRecieveHandler != null) {
        onRecieveHandler!(data);
      }
    });
    socket.onConnectError((err) => print("Connection Error: " + err));
    socket.onError((err) => print("Socket Error: " + err));
  }

  sendMessage(String message) {
    socket.emit("onMessage", {"message": message});
  }
}
