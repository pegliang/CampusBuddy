// import 'package:flutter/material.dart';
// import 'package:my_app/responsive.dart';

// import '../../components/background.dart';
// import 'components/profile_page.dart';
// import 'components/profile_screen_img.dart';

// class ProfileScreen extends StatelessWidget {
//   const ProfileScreen({Key? key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     final user = UserPreferences.myUser;

//     return Scaffold(
//       appBar: buildAppBar(context),
//       body: ListView(
//         physics: BouncingScrollPhysics(),
//         children: [
//           ProfileWidget(
//             imagePath: user.imagePath,
//             onClicked: () async {},
//           ),
//           const SizedBox(height: 24),
//           buildName(user),
//           const SizedBox(height: 24),
//           Center(child: buildUpgradeButton()),
//           const SizedBox(height: 24),
//           NumbersWidget(),
//           const SizedBox(height: 48),
//           buildAbout(user),
//         ],
//       ),
//     );
// }

// // class ProfileScreen extends StatelessWidget {
// //   const ProfileScreen({Key? key}) : super(key: key);

// //   @override
// //   Widget build(BuildContext context) {
// //     return Background(
// //       child: SingleChildScrollView(
// //         child: Responsive(
// //           mobile: const ProfileScreen(),
// //           desktop: Row(
// //             children: [
// //               const Expanded(
// //                 child: ProfileScreenTopImage(),
// //               ),
// //               Expanded(
// //                 child: Row(
// //                   mainAxisAlignment: MainAxisAlignment.center,
// //                   children: const [
// //                     SizedBox(
// //                       width: 450,
// //                       child: ProfilePage(),
// //                     ),
// //                   ],
// //                 ),
// //               ),
// //             ],
// //           ),
// //         ),
// //       ),
// //     );
// //   }
// // }

// // class ProfileScreen extends StatelessWidget {
// //   const ProfileScreen({
// //     Key? key,
// //   }) : super(key: key);

// //   @override
// //   Widget build(BuildContext context) {
// //     return Column(
// //       mainAxisAlignment: MainAxisAlignment.center,
// //       children: <Widget>[
// //         const ProfileScreenTopImage(),
// //         Row(
// //           children: const [
// //             Spacer(),
// //             Expanded(
// //               flex: 8,
// //               child: ProfilePage(),
// //             ),
// //             Spacer(),
// //           ],
// //         ),
// //       ],
// //     );
// //   }
// // }

// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import '../../../utils/user_preferences.dart';
// import '../../../widget/appbar_widget.dart';
// import '../../../widget/button_widget.dart';
// import '../../../widget/numbers_widget.dart';
// import '../../../widget/profile_widget.dart';

// class ProfileScreen extends StatefulWidget {
//   @override
//   _ProfileScreen createState() => _ProfileScreen();
// }

// class _ProfileScreen extends State<ProfileScreen> {
//   @override
//   Widget build(BuildContext context) {
//     final user = UserPreferences.myUser;

//     return Scaffold(
//       appBar: buildAppBar(context),
//       body: ListView(
//         physics: BouncingScrollPhysics(),
//         children: [
//           ProfileWidget(
//             imagePath: user.imagePath,
//             onClicked: () async {},
//           ),
//           const SizedBox(height: 24),
//           buildName(user),
//           const SizedBox(height: 24),
//           Center(child: buildUpgradeButton()),
//           const SizedBox(height: 24),
//           NumbersWidget(),
//           const SizedBox(height: 48),
//           buildAbout(user),
//         ],
//       ),
//     );
//   }

//   Widget buildName(User user) => Column(
//         children: [
//           Text(
//             user.name,
//             style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
//           ),
//           const SizedBox(height: 4),
//           Text(
//             user.email,
//             style: TextStyle(color: Colors.grey),
//           )
//         ],
//       );

//   Widget buildUpgradeButton() => ButtonWidget(
//         text: 'Upgrade To PRO',
//         onClicked: () {},
//       );

//   Widget buildAbout(User user) => Container(
//         padding: EdgeInsets.symmetric(horizontal: 48),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text(
//               'About',
//               style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
//             ),
//             const SizedBox(height: 16),
//             Text(
//               user.about,
//               style: TextStyle(fontSize: 16, height: 1.4),
//             ),
//           ],
//         ),
//       );
// }


// on edit mode
import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';

import '../../components/background.dart';
import 'profile_page.dart';
import '../../models/user.dart';
import '../Login/components/login_form.dart';
import '../../models/user_provider.dart';
import 'package:provider/provider.dart';
import '../../widget/profile_widget.dart';
import '../../utils/user_preferences.dart';
import '../../widget/textfield_widget.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

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
                  children: <Widget>[
                    CircleAvatar(
                      backgroundColor: Colors.white70,
                      minRadius: 60.0,
                      child: CircleAvatar(
                        radius: 50.0,
                        backgroundImage: NetworkImage(''),
                      ),
            )]),
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
            padding: new EdgeInsets.all(10.0),
            child: Column(
              children: <Widget>[
                ListTile(
                  title: Text(
                    'Email',
                    style: TextStyle(
                      color: Colors.pink.shade300,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    '${Provider.of<UserProvider>(context).user?.email}',
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
                      color: Colors.pink.shade300,
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
                
              Divider(
                color: Colors.white,
                thickness: 0,),

               TextFieldWidget(
                  label: 'College Name',
                  text: '${Provider.of<UserProvider>(context).user?.collegeName}',
                  onChanged: (collegeName) {},
                ),

              Divider(
                color: Colors.white,
                thickness: 0),
               

               TextFieldWidget(
                  label: 'Friends',
                  text: 'Friends list',
                  onChanged: (friends) {},
                ),


                Divider(
                color: Colors.white,
                thickness: 0),

             TextFieldWidget(
                  label: 'Clubs',
                  text: 'Clubs list',
                  onChanged: (Clubs) {},
                ),


                Divider(
                color: Colors.white,
                thickness: 0),


                TextFieldWidget(
                  label: 'Classes',
                  text: 'classes taken',
                  onChanged: (classes) {},
                ),


                Divider(
                color: Colors.white,
                thickness: 0),

               TextFieldWidget(
                  label: 'Sexual Orientation',
                  text: 'Male/Female',
                  onChanged: (sex) {},
                ),


                
              ],
            ),
          )
        ],
      ),
    );
  }
}
