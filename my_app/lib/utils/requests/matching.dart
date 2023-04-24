import 'dart:convert';
import 'package:http/http.dart' as http;
import './request_url.dart';

Future<Map<String, dynamic>> getSuggestedMatches(String userid) async {

 try {
    final res = await http.post(Uri.parse(RequestURL.getSuggestedMatches),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"user_id": userid}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception("getSuggestedMatches request failed with a status code of $statusCode");
    }

    final bodyContent = jsonDecode(res.body);

  
    return bodyContent;
  } catch (err) {
    rethrow;
  }
}


