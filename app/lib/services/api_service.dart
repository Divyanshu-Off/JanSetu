import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  static String baseUrl = dotenv.env['API_BASE_URL'] ?? "http://10.0.2.2:8000";

  static Future<Map<String, dynamic>?> submitIssue({
  required String description,
  required double latitude,
  required double longitude,
  File? image,
}) async {
  var uri = Uri.parse('$baseUrl/issues/');
  var request = http.MultipartRequest('POST', uri);
  request.fields['description'] = description;
  request.fields['latitude'] = latitude.toString();
  request.fields['longitude'] = longitude.toString();
  if (image != null) {
    request.files.add(await http.MultipartFile.fromPath('image', image.path));
  }
  var response = await request.send();
  if (response.statusCode == 200 || response.statusCode == 201) {
    final body = await response.stream.bytesToString();
    return json.decode(body); // contains id, status, etc.
  }
  return null;
}
}