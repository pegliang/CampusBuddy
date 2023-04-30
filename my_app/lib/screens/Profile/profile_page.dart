import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import 'package:my_app/screens/Profile/profile.dart';
import '../../components/background.dart';
import '../../models/user.dart';
import '../Login/components/login_form.dart';
import '../../models/user_provider.dart';
import 'package:provider/provider.dart';
import '../../widget/profile_widget.dart';
import '../../utils/user_preferences.dart';
import '../../../constants.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Background(
      child: ListView(
        children: <Widget>[
          Container(
            height: 250,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.pinkAccent, Colors.pink.shade100],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
                stops: [0.0, 0.0],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ProfileWidget(
                        imagePath:
                            "https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/janhvi-kapoor-main_3_0.jpg",
                        onClicked: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (context) => const ProfileScreen()),
                          );
                        },
                      ),
                    ]),
                const SizedBox(
                  height: 15,
                ),
                Text(
                  '${Provider.of<UserProvider>(context).user?.name}',
                  style: TextStyle(
                    fontSize: 35,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                Text(
                  '${Provider.of<UserProvider>(context).user?.email}',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 25,
                  ),
                ),
              ],
            ),
          ),
          Container(
            child: Column(
              children: <Widget>[
                ListTile(
                  title: Text(
                    'Year',
                    style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    'Senior',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
                Divider(),
                ListTile(
                  title: Text(
                    'College Name',
                    style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    '${Provider.of<UserProvider>(context).user?.collegeName}',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
                Divider(),
                ListTile(
                  title: Text(
                    'Friend',
                    style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    'your friend list',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
                Divider(),
                ListTile(
                  title: Text(
                    'Clubs',
                    style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    'clubs you are part of',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
                Divider(),
                ListTile(
                  title: Text(
                    'Classes',
                    style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    'classes taken',
                    style: TextStyle(
                      fontSize: 18,
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
