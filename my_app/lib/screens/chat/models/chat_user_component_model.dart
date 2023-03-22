import 'package:flutter/cupertino.dart';

class ChatUserComponentModel {
  String name;
  String secondaryText;
  String image;
  String userID;
  String conversationID;
  bool isNewMatch;
  ChatUserComponentModel(
      {required this.name,
      required this.secondaryText,
      required this.image,
      required this.userID,
      required this.conversationID,
      required this.isNewMatch});
}
