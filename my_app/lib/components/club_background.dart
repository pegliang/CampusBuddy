import 'package:flutter/material.dart';

class Background extends StatelessWidget {
  final Widget child;
  const Background({
    Key? key,
    required this.child,
    this.topImage = "assets/bckgd.jpeg",
    this.bottomImage = "assets/campus1.jpeg",
  }) : super(key: key);

  final String topImage, bottomImage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        width: double.infinity,
        height: MediaQuery.of(context).size.height,
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            Positioned(
              top: 0,
              left: 0,
              child: Image(
                image: AssetImage('assets/bb.jpeg'),
                fit: BoxFit.fill,
              ),
            ),
            //Spacer(),
            SafeArea(child: child),
          ],
        ),
      ),
    );
  }
}
