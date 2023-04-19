import 'dart:convert';
import 'request_url.dart';
import 'package:http/http.dart' as http;

Future<List<dynamic>> getConversations(String userID) async {
  final queryParameters = {"userID": userID};
  final uri = Uri.http(
      RequestURL.getConversations, '/getConversations', queryParameters);
  try {
    final res =
        await http.get(uri, headers: {'Content-Type': 'application/json'});

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
