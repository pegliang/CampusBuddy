import 'dart:convert';
import 'dart:ffi';
import 'package:http/http.dart' as http;
import './request_url.dart';
import '../../models/user.dart';

Future<List<User>> getSuggestedMatches(String userid) async {
  try {
    // final res = await http.get(Uri.parse(RequestURL.getSuggestedMatches),
    //     headers: {'Content-Type': 'application/json'});
    final queryParameters = {'user_id': userid};
    final uri = Uri.http(RequestURL.gatewayHost,
        "/matching/getSuggestedMatches", queryParameters);
    final headers = {'Content-Type': 'application/json'};
    final res = await http.get(uri, headers: headers);
    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "getSuggestedMatches request failed with a status code of $statusCode");
    }

    final bodyContent = jsonDecode(res.body);
    List<User> Users =
        List<User>.from(bodyContent.map((user) => User.fromJson(user)));

    return Users;
  } catch (err) {
    rethrow;
  }
}

Future<void> swipe(String primaryUserID, String targetUserID, bool like) async {
  try {
    final reqObj = {
      "primaryUserID": primaryUserID,
      "targetUserID": targetUserID,
      "like": like
    };
    final res = await http.post(Uri.parse(RequestURL.swipe),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(reqObj));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Register request failed with a status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
