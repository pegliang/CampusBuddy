import 'dart:convert';
import 'package:http/http.dart' as http;
import './request_url.dart';

final _emailReg = RegExp(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[eE][dD][uU]$");
final _passwordReg =
    RegExp(r"^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$");

/// Ping the backend server to register a new user
/// Throw an exception if the status code is not 200
Future registerRequest(Map<String, String> registerObj) async {
  final reqEmail = registerObj["email"];
  final reqPassword = registerObj["password"];

  // no email field given
  if (reqEmail == null || reqPassword == null) {
    throw Exception("The email or password field is empty");
  }

  // email does not end with .edu
  if (!_emailReg.hasMatch(reqEmail)) {
    throw Exception("The email is invalid or does not end with .edu");
  }

  // check the password field
  if (!_passwordReg.hasMatch(reqPassword)) {
    throw Exception(
        "The password must have at least 8 characters, 1 digit, and a special symbol");
  }

  try {
    final res = await http.post(RequestURL.register,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(registerObj));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Register request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
