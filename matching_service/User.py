class User:
    def __init__(self) -> None:
        pass
    def __init__(self, userObject) -> None:
        self.id = None if userObject.get("_id") is None else str(userObject.get("_id"))
        self.name = None if userObject.get("name") is None else str(userObject.get("name"))
        self.college_name = None if userObject.get("college_name") is None else str(userObject.get("college_name"))
        self.gender = None if userObject.get("gender") is None else str(userObject.get("gender"))
        self.race = None if userObject.get("race") is None else str(userObject.get("race"))
        self.sexual_orientation = None if userObject.get("sexual_orientation") is None else str(userObject.get("sexual_orientation"))
        self.majors = [str(major) for major in userObject.get("majors")]
        self.minors = [str(minor) for minor in userObject.get("minors")]
        self.gpa = None if userObject.get("gpa") is None else int(userObject.get("gpa"))
        self.year = None if userObject.get("year") is None else int(userObject.get("year"))
        self.courses = [str(course) for course in userObject.get("courses")]
        self.clubs = [str(club) for club in userObject.get("clubs")]
        self.profile_img = None if userObject.get("profile_img") is None else str(userObject.get("profile_img"))
        self.desc = None if userObject.get("desc") is None else str(userObject.get("desc"))
        self.interests = [str(interest) for interest in userObject.get("interests")]
        self.isPremiumMember = bool(userObject.get("isPremiumMember"))
    
    def __str__(self) -> str:
        res = ""
        userObject = self.serialize()
        for key in userObject:
            res += key + ": " + str(userObject[key]) + ", "
        return res[:-2]


    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "college_name": self.college_name,
            'gender': self.gender,
            "race": self.race,
            "sexual_orientation": self.sexual_orientation,
            "majors": self.majors,
            "minors": self.minors,
            "gpa": self.gpa,
            "year": self.year,
            "courses": self.courses,
            "clubs": self.clubs,
            "profile_img": self.profile_img,
            "desc": self.desc,
            "interests": self.interests,
            "isPremiumMember": self.isPremiumMember
        }
    
    @staticmethod
    def list_serialize(users: list) -> list:
        return [user.serialize() for user in users]