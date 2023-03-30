/**
 * The schema for the user
 * 
 * @type {string} name
 * @type {string} email
 * @type {string} password
 * @type {string} college_name
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
  static String? statName;
  static String? statEmail;
  static String? statCollegeName;

  User({required this.name, required this.email, required this.collegeName});

  // User.fromJSON(Map<String, dynamic> json) {
  //   name = json["name"];
  //   email = json["email"];
  //   collegeName = json["college_name"];
  // }
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String,
      email: json['email'] as String,
      collegeName: json['college_name'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'college_name': collegeName,
    };
  }

  //{return User(name: ?? this.name)}

  //@override
  //List<Object?> get props => [name, email, collegeName];
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
