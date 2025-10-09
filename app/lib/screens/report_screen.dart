import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:geolocator/geolocator.dart';
import '../services/api_service.dart'; // adjust path as needed

class ReportScreen extends StatefulWidget {
  const ReportScreen({super.key});
  @override
  State<ReportScreen> createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  final TextEditingController descriptionController = TextEditingController();
  File? image;
  Position? position;

  Future<void> pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera);
    if (pickedFile != null) {
      setState(() => image = File(pickedFile.path));
    }
  }

  Future<void> getLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Location services are disabled.'))
      );
      return;
    }
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.deniedForever) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Location permissions are permanently denied.'))
        );
        return;
      }
    }
    Position pos = await Geolocator.getCurrentPosition();
    setState(() => position = pos);
  }

  Future<void> submitReport() async {
    if (descriptionController.text.isEmpty || position == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please add a description and location.'))
      );
      return;
    }
    bool success = await ApiService.submitIssue(
      description: descriptionController.text,
      latitude: position!.latitude,
      longitude: position!.longitude,
      image: image,
    );
    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Report submitted successfully!'))
      );
      descriptionController.clear();
      setState(() {
        image = null;
        position = null;
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Submission failed. Try again!'))
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Report Issue"), backgroundColor: Colors.blue),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(
                labelText: "Describe the issue",
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 20),
            if (image != null) Image.file(image!, height: 200),
            ElevatedButton.icon(
              icon: const Icon(Icons.camera_alt),
              label: const Text("Take a Photo"),
              onPressed: pickImage,
            ),
            const SizedBox(height: 20),
            if (position != null)
              Text("Location: ${position!.latitude}, ${position!.longitude}"),
            ElevatedButton.icon(
              icon: const Icon(Icons.location_on),
              label: const Text("Get Location"),
              onPressed: getLocation,
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: const Icon(Icons.send),
              label: const Text("Submit Report"),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(50)
              ),
              onPressed: submitReport,
            ),
          ],
        ),
      ),
    );
  }
}
