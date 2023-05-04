import 'dart:convert';

import 'package:http/http.dart' as http;
import 'request_url.dart';

Future<Map<String, dynamic>> fetchAllClubsRequest() async {
  try {
    final res =
        await http.get(Uri.parse(RequestURL.fetchAllClubs);

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Fetch club by id request failed with status code of $statusCode");
    }

    return jsonDecode(res.body);
  } catch (err) {
    rethrow;
  }
}