import 'package:flutter/material.dart';
import 'package:my_app/constants.dart';
import 'package:my_app/screens/Home/homeScreen.dart';
import 'package:my_app/screens/Club/clubScreen.dart';
import 'package:my_app/screens/chat/chatScreen.dart';
import 'package:my_app/screens/Login/login_screen.dart';

import 'package:my_app/screens/Profile/profile.dart';

//import 'screens/utils/requests/login.dart';

//void main() => runApp(const MyApp());

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  static const String _title = ' ';

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: _title,
      home: MyStatefulWidget(),
    );
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({super.key});

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static const List<Widget> _widgetOptions = <Widget>[
    HomeScreen(),
    ClubScreen(),
    ChatScreen(),
    ProfileScreen()
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CampusBuddy'),
        backgroundColor: kPrimaryColor,
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home, color: Colors.black, size: 30),
            label: 'Home',
            backgroundColor: kPrimaryColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.business, color: Colors.black, size: 30),
            label: 'Club',
            backgroundColor: kPrimaryColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat, color: Colors.black, size: 30),
            label: 'Chat',
            backgroundColor: kPrimaryColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person, color: Colors.black, size: 30),
            label: 'Profile',
            backgroundColor: kPrimaryColor,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: kPrimaryLightColor,
        onTap: _onItemTapped,
      ),
    );
  }
}
