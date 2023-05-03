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
import '../../../constants.dart';
import '../../screens/Dashboard/dashboard.dart';

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
                colors: [kPrimaryColor, Colors.white],
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
                      ProfileWidget(
                  imagePath:  "https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/janhvi-kapoor-main_3_0.jpg",
                  isEdit: true,
                  onClicked: () async {},
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
                    color: Colors.black,
                  ),
                ),
                Text(
                  '${Provider.of<UserProvider>(context).user?.email}',
                  style: TextStyle(
                    color: Colors.black,
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
                
                Divider(
                color: Colors.white,
                thickness: 0),
                

              TextFieldWidget(
                  label: 'School',
                  text: '${Provider.of<UserProvider>(context).user?.collegeName}',
                  onChanged: (collegeName) {},
                ),

              Divider(
                color: Colors.white,
                thickness: 0),
               

               TextFieldWidget(
                  label: 'GPA',
                  text: '${Provider.of<UserProvider>(context).user?.gpa}',
                  onChanged: (gpa) {},
                ),

              Divider(
                color: Colors.white,
                thickness: 0),
               
              TextFieldWidget(
                  label: 'Major',
                  text: '${Provider.of<UserProvider>(context).user?.major}',
                  onChanged: (major) {},
                ),

              Divider(
                color: Colors.white,
                thickness: 0),
               

              TextFieldWidget(
                  label: 'Minor',
                  text: '${Provider.of<UserProvider>(context).user?.minor}',
                  onChanged: (minor) {},
                ),

              Divider(
                color: Colors.white,
                thickness: 0),
               



              TextFieldWidget(
                  label: 'Gradution Year',
                  text: '${Provider.of<UserProvider>(context).user?.year}',
                  onChanged: (year) {},
                ),


              Divider(
                color: Colors.white,
                thickness: 0,),

               
              TextFieldWidget(
                  label: 'Current Courses',
                  text: '${Provider.of<UserProvider>(context).user?.courses}',
                  onChanged: (classes) {},
                ),


                Divider(
                color: Colors.white,
                thickness: 0),

        Container(

        child: ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return const DashboardScreen();
                  },
                ),
              );
            },
            child: Text(
              "save".toUpperCase(),
            ),
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor, // background
              onPrimary: Colors.white, 
              //minimumSize: Size(50, 30), // foreground
  ),
     
     

          ),

        )   
              ],
            ),
          )
        ],
      ),
    );
  }
}
