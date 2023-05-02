import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:my_app/utils/storage/user_secure_storage.dart';
import 'request_url.dart';

// name - event name
// desc - event description
// startDate - start date in YYYY-MM-DD format
// endDate - end date in YYYY-MM-DD format
// clubId
Future<void> createEventRequest(Map<String, String> reqObj) async {
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
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(reqObj));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Create event request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
