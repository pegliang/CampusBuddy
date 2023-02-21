import 'dart:convert';

import 'package:http/http.dart' as http;
import 'request_url.dart';

/// Ping the backend server to login a user
/// Throw an exception if the status code is not 200
/// If successful, return the user's information, access token, and the refresh token as an JSON object
Future<Map<String, dynamic>> loginRequest(String email, String password) async {
  try {
    final res = await http.post(Uri.parse(RequestURL.login),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"email": email, "password": password}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception("Login request failed with a status code of $statusCode");
    }

    return jsonDecode(res.body);
  } catch (err) {
    rethrow;
  }
}
