import 'dart:convert';
import 'request_url.dart';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> getConversations(String userID) async {
  try {
    final res = await http.post(Uri.parse(RequestURL.login),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"userID": userID}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "getConversations request failed with a status code of $statusCode");
    }

    return jsonDecode(res.body);
  } catch (err) {
    rethrow;
  }
}
