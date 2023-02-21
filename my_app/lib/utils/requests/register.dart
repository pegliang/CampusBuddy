import 'dart:convert';
import 'package:http/http.dart' as http;
import './request_url.dart';

/// Ping the backend server to register a new user
/// Throw an exception if the status code is not 200
Future registerRequest(Map<String, String> registerObj) async {
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
