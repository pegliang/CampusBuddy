import 'package:flutter/material.dart';
import 'package:my_app/screens/Dashboard/dashboard.dart';
import 'package:my_app/utils/requests/login.dart';
// import 'package:flutter/theme.dart';

import '../../../components/already_have_an_account.dart';
import '../../../constants.dart';
import '../../Signup/signup_screen.dart';
// import '../../../utils/requests/login.dart'; // double import??

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _emailTextFieldController =
      TextEditingController();
  final TextEditingController _passwordTextFieldController =
      TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _emailTextFieldController,
            validator: (value) {
              if (value == null || value!.length < 1)
                return "Email must not be empty";
              return null;
            },
            decoration: const InputDecoration(
              hintText: "Your email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              textInputAction: TextInputAction.done,
              obscureText: true,
              cursorColor: kPrimaryColor,
              controller: _passwordTextFieldController,
              validator: (value) {
                if (value == null || value!.length < 1)
                  return "Password must not be empty";
                return null;
              },
              decoration: const InputDecoration(
                hintText: "Your password",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding),
          Hero(
            tag: "login_btn",
            child: ElevatedButton(
              onPressed: () async {
                if (_formKey.currentState != null &&
                    _formKey.currentState!.validate()) {
                  try {
                    final res = await loginRequest(
                        _emailTextFieldController.text,
                        _passwordTextFieldController.text);
                    // Do Something with Body Response which will contain: (Save in application global state)
                    print(res);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return const DashboardScreen();
                        },
                      ),
                    );
                    /*
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        college_name: user.college_name,
                        gender: user.gender,
                        race: user.race,
                        sexual_orientation: user.sexual_orientation,
                        majors: user.majors,
                        minors: user.minors,
                        gpa: user.gpa,
                        year: user.year,
                        courses: user.courses,
                        clubs: user.clubs,
                        profile_img: user.profile_img,
                        desc: user.desc,
                        interests: user.interests,
                        verifiedEmail: user.verifiedEmail,
                        isPremiumMember: user.isPremiumMember,
                        accessToken,
                        refreshToken,
                      */
                  } catch (err) {
                    // Do something with erro (Let user know credentials were incorrect)
                    print(err);
                  }
                }
              },
              child: Text(
                "Login".toUpperCase(),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const SignUpScreen();
                  },
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
