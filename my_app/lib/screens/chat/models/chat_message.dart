import 'package:my_app/screens/chat/modules/chat_detail_page.dart';
import 'package:flutter/cupertino.dart';

enum MessageType {
  Sender,
  Receiver,
}

class ChatMessage {
  String message;
  MessageType type;
  ChatMessage({required this.message, required this.type});
}
