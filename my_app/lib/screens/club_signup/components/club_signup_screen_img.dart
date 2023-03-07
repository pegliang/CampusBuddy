import 'package:flutter/material.dart';

import '../../../constants.dart';

class ClubSignUpScreenTopImage extends StatelessWidget {
  const ClubSignUpScreenTopImage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          "Sign Up".toUpperCase(),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: defaultPadding),
        Row(
          children: const [
            Spacer(),
            Expanded(
              flex: 8,
              child: Image(
                image: AssetImage('assets/campus.jpeg'),
                height: 200,
              ),
            ),
            Spacer(),
          ],
        ),
        const SizedBox(height: defaultPadding),
      ],
    );
  }
}
