import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';

import '../../components/background.dart';
import 'components/profile_page.dart';
import 'components/profile_screen_img.dart';

// class ProfileScreen extends StatelessWidget {
//   const ProfileScreen({Key? key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Background(
//       child: SingleChildScrollView(
//         child: Responsive(
//           mobile: const ProfileScreen(),
//           desktop: Row(
//             children: [
//               const Expanded(
//                 child: ProfileScreenTopImage(),
//               ),
//               Expanded(
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: const [
//                     SizedBox(
//                       width: 450,
//                       child: ProfilePage(),
//                     ),
//                   ],
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

// class ProfileScreen extends StatelessWidget {
//   const ProfileScreen({
//     Key? key,
//   }) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       mainAxisAlignment: MainAxisAlignment.center,
//       children: <Widget>[
//         const ProfileScreenTopImage(),
//         Row(
//           children: const [
//             Spacer(),
//             Expanded(
//               flex: 8,
//               child: ProfilePage(),
//             ),
//             Spacer(),
//           ],
//         ),
//       ],
//     );
//   }
// }
