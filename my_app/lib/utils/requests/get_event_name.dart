import 'dart:convert';

import 'package:http/http.dart' as http;
import 'request_url.dart';

Future<Map<String, dynamic>> getEventNameRequest(
    String clubId, String eventName) async {
  try {
    final res = await http.get(Uri.parse(
        "${RequestURL.getEventName}?name=$eventName&clubId=${clubId}"));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Get event name request failed with status code of $statusCode");
    }

    return jsonDecode(res.body);
  } catch (err) {
    rethrow;
  }
}
