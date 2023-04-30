//import 'dart:html';
/**
 * The schema for the club
 *
 * @type {string} name *
 * @type {string[]} majors*
 * @type {string[]} minors*
 * @type {string[]} genders?*
 * @type {string[]} races?*
 * @type {string[]} sexual_orientations?*
 * @type {object[]} eboard_members*
 * @type {object[]} members?*
 * @type {string} desc*
 * 
 * ----create club 
 * // userId - String
// username - String
// title - String
// clubName - String
// majors - String[]
// minors - String[]
// gender - String[]
// races - String[]
// sexual_orientation - String[]
// desc - String
 */
import 'package:flutter/material.dart';

import '../../../components/already_have_club_account.dart';
import '../../../constants.dart';
import '../../club_login/club_login.dart';
import "../../../utils/requests/create_club.dart";

class ClubSignUpForm extends StatefulWidget {
  const ClubSignUpForm({super.key});
  @override
  _ClubSignupFormState createState() => _ClubSignupFormState();
}

class _ClubSignupFormState extends State<ClubSignUpForm> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _clubNameTextFieldController =
      TextEditingController();
  final TextEditingController _clubMajorsTextFieldController =
      TextEditingController();
  final TextEditingController _clubMinorsTextFieldController =
      TextEditingController();
  final TextEditingController _clubGendersTextFieldController =
      TextEditingController();
  final TextEditingController _clubRacesTextFieldController =
      TextEditingController();
  final TextEditingController _clubSexualOrtTextFieldController =
      TextEditingController();
  final TextEditingController _clubEboardTitleTextFieldController =
      TextEditingController();
  final TextEditingController _clubEboardNameTextFieldController =
      TextEditingController();
  final TextEditingController _clubDescTextFieldController =
      TextEditingController();

  Future<void> createClub() async {
    return createClubRequest({
      'clubName': _clubNameTextFieldController,
      'majors': _clubMajorsTextFieldController,
      'minors': _clubMinorsTextFieldController,
      'gender': _clubGendersTextFieldController,
      'races': _clubRacesTextFieldController,
      'sexual_orientation': _clubSexualOrtTextFieldController,
      'title': _clubEboardTitleTextFieldController,
      'username': _clubEboardNameTextFieldController,
      'desc': _clubDescTextFieldController
    });
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            keyboardType: TextInputType.name,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _clubNameTextFieldController,
            decoration: const InputDecoration(
              hintText: "club Name",
              prefixIcon: Padding(
                padding: EdgeInsets.all(defaultPadding),
                child: Icon(Icons.local_activity),
              ),
            ),
          ),
          Padding(
              padding: const EdgeInsets.symmetric(vertical: defaultPadding),
              child: TextFormField(
                keyboardType: TextInputType.name,
                textInputAction: TextInputAction.next,
                cursorColor: kPrimaryColor,
                controller: _clubEboardTitleTextFieldController,
                decoration: const InputDecoration(
                  hintText: "Club EBoard member title",
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.person),
                  ),
                ),
              )),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _clubEboardNameTextFieldController,
            decoration: const InputDecoration(
              hintText: "club eboard member name",
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
                controller: _clubMajorsTextFieldController,
                decoration: const InputDecoration(
                  hintText: "intended majors, N/A if open to all",
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.person),
                  ),
                ),
              )),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _clubMinorsTextFieldController,
            decoration: const InputDecoration(
              hintText: "intended minors, N/A if open to all",
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
                controller: _clubGendersTextFieldController,
                decoration: const InputDecoration(
                  hintText: "intended genders, N/A if open to all",
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.person),
                  ),
                ),
              )),
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _clubRacesTextFieldController,
            decoration: const InputDecoration(
              hintText: "intended races, N/A if open to all",
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
                controller: _clubSexualOrtTextFieldController,
                decoration: const InputDecoration(
                  hintText: "intended Sex Orientation, N/A if open to all",
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.person),
                  ),
                ),
              )),
          TextFormField(
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.next,
            cursorColor: kPrimaryColor,
            controller: _clubDescTextFieldController,
            textAlign: TextAlign.left,
            decoration: const InputDecoration(
              hintText: "Breif Description",
              isDense: true,
              prefixIcon: Padding(
                padding: EdgeInsets.fromLTRB(0.0, 50.0, 0.0, 50.0),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding / 2),
          ElevatedButton(
            onPressed: () {},
            child: Text("Sign Up".toUpperCase()),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveClubAccountCheck(
            login: false,
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const ClubLoginScreen();
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
