import 'package:flutter/material.dart';

import '../../../constants.dart';

class LoginScreenTopImage extends StatelessWidget {
  const LoginScreenTopImage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text(
          "Login",
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
        ),
        //const SizedBox(height: defaultPadding * 2),
        Row(
          
          children: const [
            //Spacer(),
            Expanded(
              flex: 8,
              
              child: Image(
                image: AssetImage('assets/cblogo.png'),
                height: 300,
                
              ),
            ),
            
          ],
        ),
         const SizedBox(height: defaultPadding / 1000),
      ],
    );
  }
}
