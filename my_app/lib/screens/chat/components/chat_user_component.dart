import 'package:my_app/screens/chat/modules/chat_detail_page.dart';
import 'package:flutter/material.dart';
import 'package:my_app/screens/chat/models/chat_user_component_model.dart';

class ChatUserComponent extends StatelessWidget {
  final ChatUserComponentModel? model;
  const ChatUserComponent({super.key, this.model});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (context) {
          return ChatDetailPage(chatID: model?.conversationID ?? "");
        }));
      },
      child: Container(
        padding:
            const EdgeInsets.only(left: 16, right: 16, top: 10, bottom: 10),
        child: Row(
          children: <Widget>[
            Expanded(
              child: Row(
                children: <Widget>[
                  CircleAvatar(
                    backgroundImage: NetworkImage(model?.image ?? ""),
                    maxRadius: 30,
                  ),
                  const SizedBox(
                    width: 16,
                  ),
                  Expanded(
                    child: Container(
                      color: Colors.transparent,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(model?.name ??
                              "Something went wrong loading user"),
                          const SizedBox(
                            height: 6,
                          ),
                          Text(
                            model?.secondaryText ?? "",
                            style: TextStyle(
                                fontSize: 14, color: Colors.grey.shade500),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
