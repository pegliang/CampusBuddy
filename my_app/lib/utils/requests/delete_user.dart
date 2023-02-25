import 'package:http/http.dart' as http;
import 'package:my_app/utils/requests/request_url.dart';
import 'package:my_app/utils/storage/user_secure_storage.dart';

/// Ping the backend server to delete a user from the database
/// Throw an exception if the status code is not 200
/// Returns nothing if successful
Future<void> deleteUserRequest(String email) async {
  String? accessToken = await UserSecureStorage.getAccessToken();
  String? refreshToken = await UserSecureStorage.getRefreshToken();

  if (accessToken == null) {
    throw Exception("No access token in storage");
  }

  if (refreshToken == null) {
    throw Exception("No refresh token in storage");
  }

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
