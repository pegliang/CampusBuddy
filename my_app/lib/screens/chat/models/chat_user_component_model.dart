import 'package:flutter/cupertino.dart';

class ChatUserComponentModel {
  late String name;
  late String secondaryText;
  late String image;
  late String userID;
  late String conversationID;
  late bool isNewMatch;
  ChatUserComponentModel(
      {required this.name,
      required this.secondaryText,
      required this.image,
      required this.userID,
      required this.conversationID,
      required this.isNewMatch});

  ChatUserComponentModel.fromJSON(Map<String, dynamic> json) {
    name = json["conversation_user"]["name"]
    secondaryText = "";
    image = json["conversation_user"]["profile_img"];
    userID = json["conversation_user"]["id"];
    conversationID = json["conversation_id"];
    isNewMatch = json["newly_matched"];
  }
}
