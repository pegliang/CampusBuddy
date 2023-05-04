//* ----create club
//* // userId - String
// username - String
// title - String
// clubName - String
// majors - String[]
// minors - String[]
// gender - String[]
// races - String[]
// sexual_orientation - String[]
// desc - String

import "package:flutter/material.dart";

import "../screens/Login/components/login_form.dart";
import "../screens/club_signup/components/club_signup_form.dart";
import 'package:provider/provider.dart';
import 'package:flutter/foundation.dart';

class ClubUser {
  String? clubname;
  List<String?>? majors;
  List<String?>? minors;
  List<String?>? gender;
  List<String?>? races;
  List<String?>? sexOrtient;
  String? desc;
  String? username;
  String? title;
  String? userId;

  ClubUser(
      {required this.clubname,
      required this.majors,
      required this.minors,
      required this.gender,
      required this.races,
      required this.sexOrtient,
      required this.desc,
      required this.username,
      required this.title,
      this.userId});

  factory ClubUser.fromJson(Map<String, dynamic> json) {
    return ClubUser(
      clubname: json['clubname'] as String?,
      majors: jsonListToStringList(json['majors']),
      minors: jsonListToStringList(json['minors']),
      gender: jsonListToStringList(json['gender']),
      races: jsonListToStringList(json['races']),
      sexOrtient: jsonListToStringList(json['sexual_orientation']),
      desc: json['desc'] as String?,
      username: json['username'] as String?,
      title: json['title'] as String?,
      userId: json['userId'] as String?,
    );
  }

  static List<String> jsonListToStringList(dynamic field) {
    List<dynamic> list = field as List<dynamic>;
    List<String> stringList = [];
    for (dynamic element in list) {
      if (element is String) {
        stringList.add(element);
      }
    }
    return stringList;
  }

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'title': title,
      'majors': majors,
      'minors': minors,
      'gender': gender,
      'races': races,
      'sexual_orientation': sexOrtient,
      'desc': desc,
      'userId': userId
    };
  }
}

//* ----create club
//* // userId - String
// username - String
// title - String
// clubName - String
// majors - String[]
// minors - String[]
// gender - String[]
// races - String[]
// sexual_orientation - String[]
// desc - String
