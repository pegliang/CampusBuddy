import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:my_app/utils/storage/user_secure_storage.dart';
import 'request_url.dart';

Future<void> createEventRequest(String clubId, String userId) async {
  String? accessToken = await UserSecureStorage.getAccessToken();
  String? refreshToken = await UserSecureStorage.getRefreshToken();

  if (accessToken == null) {
    throw Exception("No access token in storage");
  }

  if (refreshToken == null) {
    throw Exception("No refresh token in storage");
  }

  try {
    final res = await http.post(Uri.parse(RequestURL.createEvent),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer $accessToken",
          "RefreshToken": refreshToken
        },
        body: jsonEncode({clubId: clubId, userId: userId}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Delete club by id request failed with status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
