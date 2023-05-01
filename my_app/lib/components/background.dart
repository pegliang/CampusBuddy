import 'package:flutter/material.dart';

class Background extends StatelessWidget {
  final Widget child;
  const Background({
    Key? key,
    required this.child,
    this.topImage = "assets/cblogo.png",
    this.bottomImage = "assets/cblogo.png",
  }) : super(key: key);

  final String topImage, bottomImage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SizedBox(
        width: double.infinity,
        height: MediaQuery.of(context).size.height,
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            const Positioned(
              child: Image(
                image: AssetImage('assets/bw.jpeg'),
                fit: BoxFit.fill,
              ),
            ),
            SafeArea(child: child),
          ],
        ),
      ),
    );
  }
}
