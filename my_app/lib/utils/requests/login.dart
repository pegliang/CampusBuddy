import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:my_app/utils/storage/user_secure_storage.dart';
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

    final bodyContent = jsonDecode(res.body);

    if (bodyContent["accessToken"] == null ||
        bodyContent["refreshToken"] == null) {
      throw Exception("No access or refresh token given");
    }

    try {
      await UserSecureStorage.setAccessToken(bodyContent["accessToken"]);
      await UserSecureStorage.setRefreshToken(bodyContent["refreshToken"]);
      final accToken = await UserSecureStorage.getAccessToken();
      final refToken = await UserSecureStorage.getRefreshToken();
      print('$accToken $refToken');
    } catch (err) {
      throw Exception("An error occurred while storing tokens");
    }

    return bodyContent;
  } catch (err) {
    rethrow;
  }
}
