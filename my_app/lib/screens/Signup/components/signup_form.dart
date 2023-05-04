/**
 * The schema for the user
 * 
 * @type {string} name ~*
 * @type {string} email ~*
 * @type {string} password ~*
 * @type {string} college_name ~*
 * @type {string} gender? ~
 * @type {string} race? ~
 * @type {string} sexual_orientation? ----add this
 * @type {string[]} majors? ~*
 * @type {string[]} minors? ~*
 * @type {number} gpa? ~*
 * @type {number} year? ~*
 * @type {string[]} courses? ~*
 * @type {string[]} clubs? ~
 * @type {string} profile_img
 * @type {string} desc? ~*
 * @type {string[]} interests? ~
 */

import 'package:flutter/material.dart';

import '../../../components/already_have_an_account.dart';
import '../../../constants.dart';
import '../../Login/login_screen.dart';
import '../../../utils/requests/register.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../../../utils/requests/imageUpload.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});
  @override
  _SignupFormState createState() => _SignupFormState();
}

class _SignupFormState extends State<SignUpForm> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _emailTextFieldController =
      TextEditingController();
  final TextEditingController _passwordTextFieldController =
      TextEditingController();
  final TextEditingController _reenteredPasswordTextFieldController =
      TextEditingController();
  final TextEditingController _fullNameTextFieldController =
      TextEditingController();
  final TextEditingController _majorTextFieldController =
      TextEditingController();
  final TextEditingController _schoolNameTextFieldController =
      TextEditingController();
  final TextEditingController _yearTextFieldController =
      TextEditingController();
  final TextEditingController _gpaTextFieldController = TextEditingController();
  final TextEditingController _raceTextFieldController =
      TextEditingController();
  final TextEditingController _minorTextFieldController =
      TextEditingController();
  final TextEditingController _coursesTextFieldController =
      TextEditingController();
  final TextEditingController _genderTextFieldController =
      TextEditingController();
  final TextEditingController _clubsTextFieldController =
      TextEditingController();
  final TextEditingController _descTextFieldController =
      TextEditingController();
  final TextEditingController _interestsTextFieldController =
      TextEditingController();
  File? _pickedImage;
  bool isLoading = false;

  Future<void> registerUser() async {
    setState(() {
      isLoading = true;
    });
    await registerRequest({
      'email': _emailTextFieldController.text,
      'password': _passwordTextFieldController.text,
      'name': _fullNameTextFieldController.text,
      'majors': [_majorTextFieldController.text],
      'college_name': _schoolNameTextFieldController.text,
      'year': _yearTextFieldController.text,
      'gpa': _gpaTextFieldController.text,
      'race': _raceTextFieldController.text,
      'minors': [_minorTextFieldController.text],
      'courses': [_coursesTextFieldController.text],
      'gender': _genderTextFieldController.text,
      'clubs': [_clubsTextFieldController.text],
      'desc': _descTextFieldController.text,
      'interests': [_interestsTextFieldController.text],
    }, _pickedImage);
    setState(() {
      isLoading = false;
    });
  }

  Future<void> _pickImage(ImageSource source) async {
    final XFile? pickedImage = await ImagePicker().pickImage(source: source);
    if (pickedImage != null) {
      setState(() {
        _pickedImage = File(pickedImage.path);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundImage:
                _pickedImage != null ? FileImage(_pickedImage!) : null,
            child: _pickedImage == null
                ? const Icon(Icons.person, size: 40)
                : null,
          ),
          TextButton.icon(
            onPressed: () => _pickImage(ImageSource.gallery),
            icon: const Icon(Icons.image),
            label: const Text('Add Image'),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              // Full Name Text Field
              keyboardType: TextInputType.name,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _fullNameTextFieldController,
              decoration: const InputDecoration(
                hintText: "Full Name",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.person),
                ),
              ),
            ),
          ),
          TextFormField(
            // Email Text Field
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _emailTextFieldController,
            decoration: const InputDecoration(
              hintText: "School Email",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.email),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              keyboardType: TextInputType.name,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _schoolNameTextFieldController,
              decoration: const InputDecoration(
                hintText: "School",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.location_city),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.number,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _gpaTextFieldController,
            decoration: const InputDecoration(
              hintText: "GPA",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.grade_outlined),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              // Major Text Field
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _majorTextFieldController,
              decoration: const InputDecoration(
                hintText: "Major",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.history_edu),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _minorTextFieldController,
            decoration: const InputDecoration(
              hintText: "Minor, N/A if not applicable",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.history_edu),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              // Major Text Field
              keyboardType: TextInputType.number,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _yearTextFieldController,
              decoration: const InputDecoration(
                hintText: "Expected Graduation Year",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.school),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _coursesTextFieldController,
            decoration: const InputDecoration(
              hintText: "current courses",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.location_city),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              // Major Text Field
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _clubsTextFieldController,
              decoration: const InputDecoration(
                hintText: "Club memberships",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.group),
                ),
              ),
            ),
          ),
          TextFormField(
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _descTextFieldController,
            decoration: const InputDecoration(
              hintText: "Small description of yourself",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.description_rounded),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              // Major Text Field
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.next,
              cursorColor: kPrimaryColor,
              controller: _interestsTextFieldController,
              decoration: const InputDecoration(
                hintText: "Your interests",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.interests),
                ),
              ),
            ),
          ),
          TextFormField(
            textInputAction: TextInputAction.done,
            obscureText: true,
            controller: _reenteredPasswordTextFieldController,
            validator: (value) {
              if (_reenteredPasswordTextFieldController.text !=
                  _passwordTextFieldController.text) {
                return "Passwords must match.";
              }
              return null;
            },
            cursorColor: kPrimaryColor,
            decoration: const InputDecoration(
              hintText: "Enter Password",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.lock),
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
                if (_reenteredPasswordTextFieldController.text !=
                    _passwordTextFieldController.text) {
                  return "Passwords must match.";
                }
                return null;
              },
              decoration: const InputDecoration(
                hintText: "Re-enter Password",
                prefixIcon: Padding(
                  padding: EdgeInsets.all(defaultPadding),
                  child: Icon(Icons.lock),
                ),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding / 1),
          ElevatedButton(
              onPressed: isLoading
                  ? null
                  : () async {
                      if (_formKey.currentState != null &&
                          _formKey.currentState!.validate()) {
                        try {
                          await registerUser();
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return LoginScreen();
                              },
                            ),
                          );
                          // Do Something once user registers successfully (Move on to home screen, save credentials etc)
                        } catch (err) {
                          // Do something when User register fails (Display message etc)
                          print(err.toString());
                        }
                      }
                    },
              child: Text("SIGN UP"),
              style: isLoading
                  ? ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.grey),
                    )
                  : null),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            login: false,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const LoginScreen();
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
