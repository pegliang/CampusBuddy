// import 'package:flutter/material.dart';
// import 'screens/login.dart';

// void main() {
//   runApp( MyApp());
// }

// class MyApp extends StatelessWidget {
//   //const MyApp({Key? key}) : super(key: key);
//   //const MyApp({super.key});

//   // welcome
//   @override
//   Widget build(BuildContext context) {
//     return  MaterialApp(
//       //debugShowCheckedModeBanner: false,
//       title:'welcome',
//       theme: ThemeData(
//         primarySwatch: Colors.pink,
//        ),
//       initialRoute: '/',
//       onGenerateRoute: RouteGenerator.generateRoute,
//     );
//   }
// }

// // welcomePage
// class welcomePage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(

//     );
//   }
// }

// // login
// @override
// Widget build(BuildContext context) {
//   return  MaterialApp(
//     debugShowCheckedModeBanner: false,
//     title:'Flutter Demo',
//     theme: ThemeData(
//       primarySwatch: Colors.pink,
//      ),
//     home: LoginPage(),   // change this to initial page
//   );
// }

// // signup

import 'package:flutter/material.dart';
import 'package:my_app/Screens/Welcome/welcome_screen.dart';
import 'package:my_app/constants.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CampusBuddy',
      theme: ThemeData(
          primaryColor: kPrimaryColor,
          scaffoldBackgroundColor: Colors.white,
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              elevation: 0,
              primary: kPrimaryColor,
              shape: const StadiumBorder(),
              maximumSize: const Size(double.infinity, 56),
              minimumSize: const Size(double.infinity, 56),
            ),
          ),
          inputDecorationTheme: const InputDecorationTheme(
            filled: true,
            fillColor: kPrimaryLightColor,
            iconColor: kPrimaryColor,
            prefixIconColor: kPrimaryColor,
            contentPadding: EdgeInsets.symmetric(
                horizontal: defaultPadding, vertical: defaultPadding),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(30)),
              borderSide: BorderSide.none,
            ),
          )),
      home: const WelcomeScreen(),
    );
  }
}
