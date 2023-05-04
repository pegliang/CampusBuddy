import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import '../../../constants.dart';


class settingsPage extends StatelessWidget {
  const settingsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: const Text('Settings'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: const Text('settings stuffs here'),
        ),
      ),
    );
  }
}
