/**
 * The schema for the user
 * 
 * @type {string} name -
 * @type {string} email -
 * @type {string} password
 * @type {string} college_name -
 * @type {string} gender?
 * @type {string} race?
 * @type {string} sexual_orientation?
 * @type {string[]} majors?
 * @type {string[]} minors?
 * @type {number} gpa?
 * @type {number} year?
 * @type {string[]} courses?
 * @type {string[]} clubs?
 * @type {string} profile_img
 * @type {string} desc?
 * @type {string[]} interests?
 */

import "package:flutter/material.dart";

import "../screens/Login/components/login_form.dart";
import "../screens/Signup/components/signup_form.dart";
import 'package:provider/provider.dart';
import 'package:flutter/foundation.dart';

class User {
  String? name;
  String? email;
  String? collegeName;
  String? id;
  String? profileUrl;
  String? gender;
  String? race;
  String? sexualOrientation;
  String? major;
  String? minor;
  num? gpa;
  num? year;
  String? courses;
  String? clubs;
  String? desc;
  String? interests;

  User(
      {required this.name,
      required this.email,
      required this.collegeName,
      required this.profileUrl,
      this.id,
      required this.gender,
      required this.race,
      required this.sexualOrientation,
      required this.major,
      required this.minor,
      required this.gpa,
      required this.year,
      required this.courses,
      required this.clubs,
      required this.desc,
      required this.interests});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        name: json['name'] as String,
        email: json['email'] as String?,
        collegeName: json['college_name'] as String,
        profileUrl: json['profile_img'] as String,
        id: json["id"],
        gender: json['gender'] as String,
        race: json['race'] as String,
        sexualOrientation: json['sexual_orientation'] as String,
        major: json['majors'] as String,
        minor: json['minors'] as String,
        gpa: json['gpa'] as num,
        year: json['year'] as num,
        courses: json['courses'] as String,
        clubs: json['clubs'] as String,
        desc: json['desc'] as String,
        interests: json['interests'] as String);
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'college_name': collegeName,
      'profile_img': profileUrl,
      'id': id,
      'gender': gender,
      'race': race,
      'sexual_orientation': sexualOrientation,
      'majors': major,
      'minors': minor,
      'gpa': gpa,
      'year': year,
      'courses': courses,
      'clubs': clubs,
      'desc': desc,
      'interests': interests
    };
  }
}

//tatic void createUser
// User({this._name});

// Map<String,dynamic> get map {
//   return {
//     "name": name,
//     "email": email,
//     "college name": collegeName,
//   };
// }

//User({required this.name, required this.email, required this.collegeName});

// factory User.fromMap(Map<String, dynamic> map) {
//   return User(
//     name: map['name'] as String,
//     email: map['email'] as String,
//     collegeName: map['college_name'] as String,
//   );

// User(this._name);
// String get name => _name;

// String _email;
// User(this._email);
// String get email => _email;

// String _college_name;
// User(this._college_name);
// String get college_name => _college_name;
