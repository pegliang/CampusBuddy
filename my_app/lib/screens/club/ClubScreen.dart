import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import '../../../constants.dart';

import '../../components/background.dart';
import '../club_signup/components/club_signup_form.dart';
import '../club_signup/club_signup.dart';

class ClubScreen extends StatelessWidget {
  const ClubScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const SizedBox(height: 16),
      ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return const ClubSignUpScreen(); // club login
              },
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: Colors.pink.shade200,
          elevation: 0,
          minimumSize: const Size.fromHeight(40),
        ),
        child: Text(
          "+ Create a Club ".toUpperCase(),
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
      ),

      // ListView.builder(
      //               itemCount: .length,
      //               shrinkWrap: true,
      //               physics: NeverScrollableScrollPhysics(),
      //               itemBuilder: (context, index) {
      //                 return Container(
      //                   padding: EdgeInsets.only(top: 10, bottom: 10),
      //                   child: ListTile(
      //                     leading: Container(
      //                       decoration: BoxDecoration(
      //                         borderRadius: BorderRadius.circular(30),
      //                         color: menuItems[index].color.shade50,
      //                       ),
      //                       height: 50,
      //                       width: 50,
      //                       child: Icon(
      //                         menuItems[index].icons,
      //                         size: 20,
      //                         color: menuItems[index].color.shade400,
      //                       ),
      //                     ),
      //                     title: Text(menuItems[index].text),
      //                   ),
      //                 );
      //               },
      //             )
    ]);
  }
}
