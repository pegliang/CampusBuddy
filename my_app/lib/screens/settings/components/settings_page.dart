// import 'package:flutter/material.dart';
// //import 'package:settings_ui/settings_ui.dart';
// import 'package:app_settings/app_settings.dart';
// import '../../widget/icon_widget.dart'; 


// // class SettingsPage extends StatelessWidget {
// //   const SettingsPage({Key? key}) : super(key: key);

// //   @override
// //   Widget build(BuildContext context) {
// //    Scaffold(
// //     body: SafeArea(
// //       child: ListView(
// //         padding: EdgeInsets.all(24),
// //         children: [
// //           SettingsGroup(
// //                 title: 'GENERAL',
// //                 children: <Widget>[],
// //               ),
// //               )
// //         ],
// //       ),
// //     ),
// //    );

// //   }

// class SettingsPage extends StatefulWidget {
//   @override
//   _SettingsPageState createState() => _SettingsPageState();
// }

// class _SettingsPageState extends State<SettingsPage> {
//   @override
//   Widget build(BuildContext context) => Scaffold(
//         body: SafeArea(
//             child: ListView(
//           padding: EdgeInsets.all(24),
//           children: [
//             SettingsGroup(
//               title: 'GENERAL',
//               children: <Widget>[
//                 buildLogout(),
//                 buildDeleteAccount(),
//               ],
//             ),
//             const SizedBox(height: 32),
//             SettingsGroup(title: 'FEEDBACK',
//             childdren: <Widget>[
//               const SizedBox(height: 8),
//               buildReportBug(context),
//               buildSendFeedback(contxt),

//             ],
//             ),
//           ],
//         )),
//       );

//       Widget buildLogout() => SimpleSettingsTile(
//         title: 'Logout',
//         subtitle:  '',
//         leading: Icon (Icons.logout, color: Colors.black )
//         //onTap: () => Utils.showSnackBar(context, 'Clicked Logout')
//       );

//       Widget buildDeleteAccount() => SimpleSettingsTile(
//         title: 'Logout',
//         subtitle:  '',
//         leading: Icon (Icons.delete, color: Colors.black )
//         //onTap: () => Utils.showSnackBar(context, 'Clicked Delete')
//       );


//       Widget buildReportBug(BuildContext context) => SimpleSettingsTile(
//         title: 'Report a Bug',
//         subtitle:  '',
//         leading: Icon (Icons.bug_report, color: Colors.black )
//         //onTap: () => Utils.showSnackBar(context, 'Clicked Report')
//       );

//       Widget buildSendFeedback() => SimpleSettingsTile(
//         title: 'Send Feedback',
//         subtitle:  '',
//         leading: Icon (Icons.thumbs_up_down, color: Colors.black )
//         //onTap: () => Utils.showSnackBar(context, 'Clicked SendFeedback')
//       );


// }
