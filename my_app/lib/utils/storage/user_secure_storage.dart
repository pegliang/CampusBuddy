import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Secure user storage to store access token, refresh token,and other sensitive information
class UserSecureStorage {
  static final _storage = FlutterSecureStorage();

  static Future<void> setAccessToken(String accessToken) async {
    await _storage.write(key: "accessToken", value: accessToken);
  }

  static Future<void> setRefreshToken(String refreshToken) async {
    await _storage.write(key: "refreshToken", value: refreshToken);
  }

  static Future<String?> getAccessToken() async {
    return await _storage.read(key: "accessToken");
  }

  static Future<String?> getRefreshToken() async {
    return await _storage.read(key: "refreshToken");
  }
}
