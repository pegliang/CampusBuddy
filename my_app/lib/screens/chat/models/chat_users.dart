import 'package:flutter/cupertino.dart';
//import 'package:meta/meta.dart';

class ChatUsers {
  String text;
  String secondaryText;
  String image;
  String time;
  String length;
  ChatUsers(
      {required this.length,
      required this.text,
      required this.secondaryText,
      required this.image,
      required this.time});
}
