import 'package:flutter/material.dart';

import '../../../components/already_have_an_account.dart';
import '../../../constants.dart';
import '../../Login/login_screen.dart';
import '../../../utils/requests/register.dart';


class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});
  @override
  _SignupFormState createState() => _SignupFormState();
}

class _SignupFormState extends State<SignUpForm> {

  final _formKey = GlobalKey<FormState>();

  final TextEditingController _emailTextFieldController = TextEditingController();
  final TextEditingController _passwordTextFieldController = TextEditingController();
  final TextEditingController _reenteredPasswordTextFieldController = TextEditingController();
  final TextEditingController _fullNameTextFieldController = TextEditingController();
  final TextEditingController _majorTextFieldController = TextEditingController();

  Future<void> registerUser() async {
    return registerRequest({
      'email': _emailTextFieldController.text,
      'password': _passwordTextFieldController.text,
      'name': _fullNameTextFieldController.text,
      'majors': [_majorTextFieldController.text],
      'college_name': "The City College of New York",
      "profile_img": "www.google.com"
    });
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField( // Full Name Text Field
              keyboardType: TextInputType.name,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _fullNameTextFieldController,
              decoration: InputDecoration(
                hintText: "Full Name",
                prefixIcon: Padding(
                  padding: const EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.person),
                ),
              ),
            ),
          ),

           TextFormField( // Email Text Field
              keyboardType: TextInputType.emailAddress,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _emailTextFieldController,
              decoration: InputDecoration(
                hintText: "School Email",
                prefixIcon: Padding(
                  padding: const EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.email),
                ),
              ),
            ),

          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField( // Major Text Field
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _majorTextFieldController,
              decoration: InputDecoration(
                hintText: "Major",
                prefixIcon: Padding(
                  padding: const EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.school),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _passwordTextFieldController,
            validator: (value) {
                if (_reenteredPasswordTextFieldController.text != _passwordTextFieldController.text) {
                  return "Passwords must match.";
                }
                return null;
              },
            decoration: InputDecoration(
              hintText: "School",
              prefixIcon: Padding(
                padding: const EdgeInsets.all(defaultPadding),
                child: Icon(Icons.location_city),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              textInputAction: TextInputAction.done,
              obscureText: true,
              controller: _reenteredPasswordTextFieldController,
              validator: (value) {
                if (_reenteredPasswordTextFieldController.text != _passwordTextFieldController.text) {
                  return "Passwords must match.";
                }
                return null;
              },
              cursorColor: kPrimaryColor,
              decoration: InputDecoration(
                hintText: "Enter Password",
                prefixIcon: Padding(
                  padding: const EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          TextFormField(
            textInputAction: TextInputAction.done,
            obscureText: true,
            cursorColor: kPrimaryColor,
            decoration: InputDecoration(
              hintText: "Re-enter Password",
              prefixIcon: Padding(
                padding: const EdgeInsets.all(defaultPadding),
                child: Icon(Icons.lock),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding / 1),
          ElevatedButton(
            onPressed: () async {
              if (_formKey.currentState != null && _formKey.currentState!.validate()) {
                try {
                  await registerUser();

                  // Do Something once user registers successfully (Move on to home screen, save credentials etc)
                } catch (err) {
                  // Do something when User register fails (Display message etc)

                }
              }
            },
            child: Text("Sign Up".toUpperCase()),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            login: false,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return LoginScreen();
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
