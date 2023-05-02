import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import '../../../constants.dart';

import '../../components/background.dart';
import '../club_signup/components/club_signup_form.dart';
import '../club_signup/club_signup.dart';

class ClubScreen extends StatelessWidget {
  const ClubScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: OutlinedButton(
          child: Text("+ Create a club"),
          style: OutlinedButton.styleFrom(
            primary: Colors.pink.shade50,
            side: BorderSide(
              color: Colors.pink.shade100,
            ),
          ),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return const ClubSignUpScreen();
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
