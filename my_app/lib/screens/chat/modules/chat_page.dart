import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import '../../../constants.dart';

import 'package:flutter/cupertino.dart';

import 'package:my_app/screens/chat/components/chat_user_component.dart';
import 'package:my_app/screens/chat/models/chat_user_component_model.dart';
import 'package:my_app/utils/requests/chats.dart';
import 'package:provider/provider.dart';
import 'package:my_app/models/user_provider.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  @override
  ChatPageState createState() => ChatPageState();
}

class ChatPageState extends State<ChatPage> {
  List<ChatUserComponentModel> chatUsers = [];
  List<ChatUserComponentModel> filteredChatUsers = [];
  final TextEditingController _searchController = TextEditingController();

  Future<void> _loadUsers() async {
    String userID =
        Provider.of<UserProvider>(context, listen: false).user?.id ??
            ""; // Replace with actual user ID when Uzma implements it
    List<dynamic> conversations = await getConversations(userID);
    setState(() {
      chatUsers = ChatUserComponentModel.fromJSONList(conversations);
      filteredChatUsers = chatUsers;
    });
  }

  @override
  void initState() {
    super.initState();
    _loadUsers();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _loadUsers();
    });
    _searchController.addListener(() {
      setState(() {
        if (_searchController.text.isEmpty) {
          this.filteredChatUsers = this.chatUsers;
        } else {
          this.filteredChatUsers = this.chatUsers.where((userComponent) {
            RegExp regex = RegExp(_searchController.text, caseSensitive: false);
            return regex.hasMatch(userComponent.name);
          }).toList();
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.only(left: 16, right: 16, top: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    const Text(
                      "Chats",
                      style:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 16, left: 16, right: 16),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: "Search...",
                  hintStyle: TextStyle(color: Colors.grey.shade400),
                  prefixIcon: Icon(
                    Icons.search,
                    color: Colors.grey.shade400,
                    size: 20,
                  ),
                  filled: true,
                  fillColor: Colors.grey.shade100,
                  contentPadding: const EdgeInsets.all(8),
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: BorderSide(color: Colors.grey.shade100)),
                ),
              ),
            ),
            ListView.builder(
              itemCount: filteredChatUsers.length,
              shrinkWrap: true,
              padding: const EdgeInsets.only(top: 16),
              physics: const NeverScrollableScrollPhysics(),
              itemBuilder: (context, index) {
                return ChatUserComponent.withModel(filteredChatUsers[index]);
              },
            ),
          ],
        ),
      ),
    );
  }
}
