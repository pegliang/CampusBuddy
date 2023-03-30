import 'package:my_app/models/user_provider.dart';
import 'package:my_app/screens/chat/components/chat_bubble.dart';
import 'package:my_app/screens/chat/components/chat_detail_page_appbar.dart';
import 'package:my_app/screens/chat/models/chat_message.dart';
import 'package:my_app/screens/chat/models/send_menu_items.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../models/chat_user_component_model.dart';
import '../../../utils/ChatService/ChatService.dart';
import '../../../utils/ChatService/Message.dart';
import 'package:provider/provider.dart';

class ChatDetailPage extends StatefulWidget {
  ChatUserComponentModel? model;

  ChatDetailPage({required this.model});

  @override
  _ChatDetailPageState createState() => _ChatDetailPageState();
}

class _ChatDetailPageState extends State<ChatDetailPage> {
  List<ChatMessage> chatMessages = [];
  late ChatService chatService;
  final TextEditingController _messageTextEditingController =
      TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.model != null) {
      chatService = ChatService(
          Provider.of<UserProvider>(context).user?.id ?? "",
          widget.model!.conversationID,
          handleMessage,
          handleInitialMessages);
    }
  }

  void handleMessage(Message message) {
    setState(() {
      chatMessages.add(ChatMessage.fromMessage(message, MessageType.Receiver));
    });
  }

  void handleInitialMessages(List<Message> messages) {
    setState(() {
      for (int i = messages.length - 1; i >= 0; i--) {
        MessageType mType = Provider.of<UserProvider>(context).user?.id ==
                messages[i].recipient_id
            ? MessageType.Receiver
            : MessageType.Sender;
        chatMessages.insert(0, ChatMessage.fromMessage(messages[i], mType));
      }
    });
  }

  List<SendMenuItems> menuItems = [
    SendMenuItems(
        text: "Photos & Videos", icons: Icons.image, color: Colors.amber),
    SendMenuItems(
        text: "Document", icons: Icons.insert_drive_file, color: Colors.blue),
    SendMenuItems(text: "Audio", icons: Icons.music_note, color: Colors.orange),
    SendMenuItems(
        text: "Location", icons: Icons.location_on, color: Colors.green),
    SendMenuItems(text: "Contact", icons: Icons.person, color: Colors.purple),
  ];

  void showModal() {
    showModalBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            height: MediaQuery.of(context).size.height / 2,
            color: Color.fromARGB(255, 225, 16, 152),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(20),
                    topLeft: Radius.circular(20)),
              ),
              child: Column(
                children: <Widget>[
                  SizedBox(
                    height: 16,
                  ),
                  Center(
                    child: Container(
                      height: 4,
                      width: 50,
                      color: Colors.grey.shade200,
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ListView.builder(
                    itemCount: menuItems.length,
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemBuilder: (context, index) {
                      return Container(
                        padding: EdgeInsets.only(top: 10, bottom: 10),
                        child: ListTile(
                          leading: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              color: menuItems[index].color.shade50,
                            ),
                            height: 50,
                            width: 50,
                            child: Icon(
                              menuItems[index].icons,
                              size: 20,
                              color: menuItems[index].color.shade400,
                            ),
                          ),
                          title: Text(menuItems[index].text),
                        ),
                      );
                    },
                  )
                ],
              ),
            ),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: ChatDetailPageAppBar(),
      body: Stack(
        children: <Widget>[
          ListView.builder(
            itemCount: chatMessages.length,
            shrinkWrap: true,
            padding: EdgeInsets.only(top: 10, bottom: 10),
            physics: NeverScrollableScrollPhysics(),
            itemBuilder: (context, index) {
              return ChatBubble(
                chatMessage: chatMessages[index],
              );
            },
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              padding: EdgeInsets.only(left: 16, bottom: 10),
              height: 80,
              width: double.infinity,
              color: Colors.white,
              child: Row(
                children: <Widget>[
                  GestureDetector(
                    onTap: () {
                      showModal();
                    },
                    child: Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                        color: Colors.blueGrey,
                        borderRadius: BorderRadius.circular(30),
                      ),
                      child: Icon(
                        Icons.add,
                        color: Colors.white,
                        size: 21,
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 16,
                  ),
                  Expanded(
                    child: TextField(
                      decoration: InputDecoration(
                          hintText: "Type message...",
                          hintStyle: TextStyle(color: Colors.grey.shade500),
                          border: InputBorder.none),
                      controller: _messageTextEditingController,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Container(
              padding: EdgeInsets.only(right: 30, bottom: 50),
              child: FloatingActionButton(
                onPressed: () {
                  chatService.sendMessage(_messageTextEditingController.text);
                  setState(() {
                    chatMessages.add(ChatMessage(
                        message: _messageTextEditingController.text,
                        type: MessageType.Sender,
                        timeSent: DateTime.now()));
                    _messageTextEditingController.text = "";
                  });
                },
                child: const Icon(
                  Icons.send,
                  color: Color.fromARGB(238, 236, 20, 200),
                ),
                backgroundColor: Color.fromARGB(255, 235, 20, 92),
                elevation: 0,
              ),
            ),
          )
        ],
      ),
    );
  }
}
