import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<String?> uploadImage(File imageFile) async {
  try {
    final CLOUD_NAME = dotenv.env['CLOUD_NAME'];
    final CLOUDINARY_API_KEY = dotenv.env['CLOUDINARY_API_KEY'];
    final CLOUDINARY_API_SECRET = dotenv.env['CLOUDINARY_API_SECRET'];
    final time = (DateTime.now().millisecondsSinceEpoch / 1000).toInt();
    final messageSignature =
        sha1.convert(utf8.encode("timestamp=${time}${CLOUDINARY_API_SECRET}"));

    // final url = Uri.parse(
    //     'https://api.cloudinary.com/v1_1/${env["CLOUD_NAME"]}/image/upload?api_key=${env["CLOUDINARY_API_KEY"]}&timestamp=$time&signature=${messageSignature.toString()}');
    // final url = Uri.parse(
    final url = Uri.parse(
        'https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${CLOUDINARY_API_KEY}&timestamp=$time&signature=${messageSignature.toString()}');

    //     "https://api.cloudinary.com/v1_1/${env["CLOUD_NAME"]}/auto/upload");
    final bytes = await imageFile.readAsBytes();
    // Create a new multipart request
    final request = http.MultipartRequest('POST', url);
    request.files.add(http.MultipartFile.fromBytes(
      'file',
      bytes,
      filename: 'image.png',
    ));

    // Send the request and wait for the response
    final response = await request.send();
    // Get the response body as a String
    final responseString = await response.stream.bytesToString();

    // Parse the response body as JSON
    final jsonResponse = json.decode(responseString);
    // Check if the upload was successful
    if (response.statusCode == 200) {
      return jsonResponse["url"];
    } else {
      return null;
    }
  } catch (err) {
    print(err.toString());
  }
}
