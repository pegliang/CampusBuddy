import 'dart:convert';

import 'package:http/http.dart' as http;
import 'request_url.dart';

Future<Map<String, dynamic>> fetchClubByIdRequest(String clubId) async {
  try {
    final res =
        await http.get(Uri.parse("${RequestURL.fetchClubById}?id=$clubId"));

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
