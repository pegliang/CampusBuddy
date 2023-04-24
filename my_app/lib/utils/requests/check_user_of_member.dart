import 'dart:convert';
import 'package:http/http.dart' as http;
import './request_url.dart';

// 200 - User is a member of the club
// 404 - User is not a member of the club
Future<void> checkUserOfMemberRequest(String clubId, String userId) async {
  try {
    final res = await http.post(Uri.parse(RequestURL.createClub),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({clubId: clubId, userId: userId}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Check user of member request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
