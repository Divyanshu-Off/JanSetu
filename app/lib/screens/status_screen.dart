import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/api_service.dart'; // Make sure the relative path matches your structure

class StatusScreen extends StatefulWidget {
  const StatusScreen({super.key});

  @override
  State<StatusScreen> createState() => _StatusScreenState();
}

class _StatusScreenState extends State<StatusScreen> {
  final TextEditingController _idController = TextEditingController();
  String? _status;

  Future<void> _checkStatus() async {
    String id = _idController.text.trim();
    if (id.isEmpty) return;
    try {
      var response = await http.get(Uri.parse('${ApiService.baseUrl}/issues/$id'));
      if (response.statusCode == 200) {
        var jsonResp = json.decode(response.body);
        setState(() {
          _status = jsonResp['status'] ?? 'No status available';
        });
      } else {
        setState(() => _status = 'Not found!');
      }
    } catch (e) {
      setState(() => _status = 'Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Check Status"),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _idController,
              decoration: const InputDecoration(
                labelText: "Enter Report ID",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: const Icon(Icons.search),
              label: const Text("Check"),
              onPressed: _checkStatus,
            ),
            const SizedBox(height: 20),
            if (_status != null)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    "Status: $_status",
                    style: const TextStyle(fontSize: 16),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
