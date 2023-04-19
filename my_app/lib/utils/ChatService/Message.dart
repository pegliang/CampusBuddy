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
    content = json["content"];
    sender_id = json["sender_id"];
    recipient_id = json["recipient_id"];
    chat_id = json["chatID"];
    time_sent = DateTime.parse(json["timestamp"]);
  }

  static JsonToList(List<dynamic> data) {
    List<Message> messages = [];
    for (int i = 0; i < data.length; i++) {
      messages.add(Message.fromJSON(data[i]));
    }
    return messages;
  }
}
