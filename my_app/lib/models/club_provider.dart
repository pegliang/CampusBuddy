import 'package:flutter/foundation.dart';
import '../models/club_user.dart';

class ClubUserProvider extends ChangeNotifier {
  ClubUser? _clubUser;

  ClubUser? get user => _clubUser;

  void setUser(ClubUser newclubUser) {
    _clubUser = newclubUser;
    notifyListeners();
  }
}
