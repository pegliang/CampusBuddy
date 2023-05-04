import 'dart:convert';
import 'package:http/http.dart' as http;
import '../storage/user_secure_storage.dart';
import './request_url.dart';

// userId - String
// username - String
// title - String
// clubName - String
// majors - String[]
// minors - String[]
// gender - String[]
// races - String[]
// sexual_orientation - String[]
// desc - String
Future<void> createClubRequest(Map<String, dynamic> reqObj) async {
  String? accessToken = await UserSecureStorage.getAccessToken();
  String? refreshToken = await UserSecureStorage.getRefreshToken();

  if (accessToken == null) {
    throw Exception("No access token in storage");
  }

  if (refreshToken == null) {
    throw Exception("No refresh token in storage");
  }
  print("heloo");
  try {
    final res = await http.post(Uri.parse(RequestURL.createClub),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer $accessToken",
          "RefreshToken": refreshToken
        },
        body: jsonEncode(reqObj));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Create club request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
