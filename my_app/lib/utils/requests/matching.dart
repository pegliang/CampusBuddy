import 'dart:convert';
import 'package:http/http.dart' as http;
import './request_url.dart';
import '../../models/user.dart';

Future<List<User>> getSuggestedMatches(String userid) async {

 try {
    final res = await http.post(Uri.parse(RequestURL.getSuggestedMatches),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"user_id": userid}));

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception("getSuggestedMatches request failed with a status code of $statusCode");
    }

    final bodyContent = jsonDecode(res.body);
    List<User> Users = List<User>.from(bodyContent.map((user)=> User.fromJson(user)));
  
    return Users;
  } catch (err) {
    rethrow;
  }
}


