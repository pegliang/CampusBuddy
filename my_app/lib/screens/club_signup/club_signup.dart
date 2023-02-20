import 'package:flutter/material.dart';
import 'package:my_app/constants.dart';
import 'package:my_app/responsive.dart';
import '../../components/club_background.dart';
import 'components/club_signup_screen_img.dart';
import 'components/club_signup_form.dart';
//import 'components/social_sign_up.dart';

class ClubSignUpScreen extends StatelessWidget {
  const ClubSignUpScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Background(
      child: SingleChildScrollView(
        child: Responsive(
          mobile: const MobileSignupScreen(),
          desktop: Row(
            children: [
              const Expanded(
                child: ClubSignUpScreenTopImage(),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    SizedBox(
                      width: 450,
                      child: ClubSignUpForm(),
                    ),
                    SizedBox(height: defaultPadding / 2),
                    // SocalSignUp()
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class MobileSignupScreen extends StatelessWidget {
  const MobileSignupScreen({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        const ClubSignUpScreenTopImage(),
        Row(
          children: const [
            Spacer(),
            Expanded(
              flex: 8,
              child: ClubSignUpForm(),
            ),
            Spacer(),
          ],
        ),
        // const SocialSignUp()
      ],
    );
  }
}
