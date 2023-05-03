import 'package:flutter/material.dart';
import '../../../models/user.dart';
import './profile_detail_widgets.dart' show front, back;

class ProfileCard extends StatefulWidget {
  final User profile;

  const ProfileCard({required this.profile});

  @override
  _profileCardState createState() => _profileCardState();
}

class _profileCardState extends State<ProfileCard>
    with SingleTickerProviderStateMixin {
  bool _showFront = true;
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        vsync: this, duration: Duration(milliseconds: 1000));
    _animation = Tween(begin: 0.0, end: 1.0).animate(_animationController);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _flip() {
    setState(() {
      if (_showFront) {
        _animationController.forward();
      } else {
        _animationController.reverse();
      }
      _showFront = !_showFront;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _flip,
      child: AnimatedSwitcher(
        duration: Duration(milliseconds: 1000),
        transitionBuilder: (Widget child, Animation<double> animation) {
          return RotationTransition(
            turns: animation,
            child: child,
          );
        },
        child: _showFront ? front(widget.profile) : back(widget.profile),
      ),
    );
  }
}
