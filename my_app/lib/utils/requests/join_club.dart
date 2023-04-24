import 'dart:convert';
import 'package:http/http.dart' as http;
import '../storage/user_secure_storage.dart';
import './request_url.dart';

Future<void> joinClubRequest(
    String userId, String clubId, String username) async {
  String? accessToken = await UserSecureStorage.getAccessToken();
  String? refreshToken = await UserSecureStorage.getRefreshToken();

  if (accessToken == null) {
    throw Exception("No access token in storage");
  }

  if (refreshToken == null) {
    throw Exception("No refresh token in storage");
  }

  try {
    final res = await http.post(Uri.parse(RequestURL.joinClub),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer $accessToken",
          "RefreshToken": refreshToken
        },
        body: jsonEncode({userId: userId, clubId: clubId, username: username}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Join club request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
