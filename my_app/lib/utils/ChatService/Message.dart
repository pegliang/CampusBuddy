class Message {
  late String content;
  late String sender_id;
  late String recipient_id;
  late String chat_id;
  late DateTime time_sent;

  Message(
      {required this.content,
      required this.sender_id,
      required this.recipient_id,
      required this.chat_id,
      required this.time_sent});

  Message.fromJSON(Map<String, dynamic> json) {
    content = json["message"];
    sender_id = json["sender_id"];
    recipient_id = json["recipient_id"];
    chat_id = json["chat_id"];
    time_sent = json["timestamp"];
  }

  static JsonToList(List<Map<String, dynamic>> jsonList) {
    List<Message> messages = [];
    for (int i = 0; i < jsonList.length; i++) {
      messages.add(Message.fromJSON(jsonList[i]));
    }
    return messages;
  }
}
