import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatService {
  late IO.Socket socket;

  ChatService() {
    socket = IO.io(SocketURL)
  }
}
