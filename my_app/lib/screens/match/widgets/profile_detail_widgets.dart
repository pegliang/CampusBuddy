import 'package:flutter/material.dart';
import '../../../models/user.dart';

Widget front(User user) {
  return Container(
    height: 580,
    width: 340,
    padding: const EdgeInsets.symmetric(vertical: 10),
    child: Stack(
      children: [
        Positioned.fill(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.network(user.profileUrl ?? ""),
          ),
        ),
        Positioned(
          bottom: 0,
          child: Container(
            height: 80,
            width: 340,
            decoration: ShapeDecoration(
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              shadows: <BoxShadow>[
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 8,
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.only(left: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    user.name ?? "",
                    style: const TextStyle(
                      fontFamily: 'Nunito',
                      fontWeight: FontWeight.w800,
                      fontSize: 21,
                    ),
                  ),
                  Text(
                    user.collegeName ?? "",
                    style: const TextStyle(
                      fontFamily: 'Nunito',
                      fontWeight: FontWeight.w400,
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ),
  );
}

String commaList(List<String?>? l, String defaultVal) {
  return l?.fold("", (previousValue, element) {
        if (previousValue == "") {
          return "${element}, ";
        }
        return ("${previousValue ?? ""}, ${element ?? ""}");
      }) ??
      defaultVal;
}

Widget TextWithField(String fieldName, String fieldVal) {
  return Column(children: [
    Text(
      fieldName,
      style: const TextStyle(
        fontFamily: 'Nunito',
        fontWeight: FontWeight.w800,
        fontSize: 21,
      ),
    ),
    Text(
      fieldVal,
      style: const TextStyle(
        fontFamily: 'Nunito',
        fontWeight: FontWeight.normal,
        fontSize: 16,
      ),
    )
  ]);
}

Widget back(User user) {
  return Container(
    height: 580,
    width: 340,
    padding: const EdgeInsets.symmetric(vertical: 10),
    decoration: ShapeDecoration(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      shadows: <BoxShadow>[
        BoxShadow(
          color: Colors.black.withOpacity(0.05),
          blurRadius: 8,
        ),
      ],
    ),
    child: ListView(
      padding: const EdgeInsets.all(20),
      children: [
        TextWithField("Description", user.desc ?? "No Description"),
        TextWithField("Clubs", commaList(user.clubs, "No Clubs")),
        TextWithField("Major", commaList(user.major, "No Major")),
        TextWithField("Minor", commaList(user.minor, "No Minor")),
        TextWithField("Interests", commaList(user.interests, "No Interests")),
        TextWithField("Courses", commaList(user.courses, "No Courses")),
        TextWithField("GPA", "${user.gpa}"),
      ],
    ),
  );
}
