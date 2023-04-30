class User {
  final String imagePath;
  final String name;
  final String email;
  final String about;
  final bool isDarkMode;

  const User({
    required this.imagePath,
    required this.name,
    required this.email,
    required this.about,
    required this.isDarkMode,
  });
}

class UserPreferences {
  static const myUser = User(
    imagePath:
        'https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/janhvi-kapoor-main_3_0.jpg',
    name: '{Provider.of<UserProvider>(context).user?.name}',
    email: '{Provider.of<UserProvider>(context).user?.email}',
    about:
        'Certified Personal Trainer and Nutritionist with years of experience in creating effective diets and training plans focused on achieving individual customers goals in a smooth way.',
    isDarkMode: false,
  );
}
