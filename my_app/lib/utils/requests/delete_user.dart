import 'package:http/http.dart' as http;
import 'package:my_app/utils/requests/request_url.dart';

/// Ping the backend server to delete a user from the database
/// Deleting a user requires the right credentials, so make sure to add the correct access and refresh token from secure storage
/// Throw an exception if the status code is not 200
/// Returns nothing if successful
Future<void> deleteUserRequest(
    String email, String accessToken, String refreshToken) async {
  try {
    final res = await http
        .delete(Uri.parse("${RequestURL.deleteUser}?email=$email"), headers: {
      "Authorization": "Bearer $accessToken",
      "RefreshToken": refreshToken
    });

    final statusCode = res.statusCode;

    if (statusCode != 200) {
      throw Exception(
          "Delete user request failed with status code of $statusCode");
    }
  } catch (err) {
    rethrow;
  }
}
