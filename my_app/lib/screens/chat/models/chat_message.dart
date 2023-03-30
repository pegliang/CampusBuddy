import 'package:my_app/screens/chat/modules/chat_detail_page.dart';
import 'package:flutter/cupertino.dart';
import '../../../utils/ChatService/Message.dart';

enum MessageType {
  Sender,
  Receiver,
}

class ChatMessage {
  late String message;
  late MessageType type;
  late DateTime timeSent;
  ChatMessage(
      {required this.message, required this.type, required this.timeSent});

  ChatMessage.fromMessage(Message message, MessageType messageType) {
    this.message = message.content;
    type = messageType;
    timeSent = message.time_sent;
  }
}
