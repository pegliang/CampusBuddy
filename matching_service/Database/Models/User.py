from mongoengine import Document, \
StringField, ListField, FloatField, IntField, URLField, BooleanField

class User(Document):
    name = StringField()
    college_name = StringField()
    gender = StringField()
    race = StringField()
    sexual_orientation = StringField()
    majors = ListField()
    minors = ListField()
    gpa = FloatField()
    year = IntField()
    courses = ListField()
    clubs = ListField()
    profile_img = URLField()
    desc = StringField()
    interests = ListField()
    isPremiumMember = BooleanField()
    verifyEmailToken = StringField()

    meta = {'collection': 'users', 'strict': False}
    
    def __str__(self) -> str:
        res = ""
        userObject = self.serialize()
        for key in userObject:
            res += key + ": " + str(userObject[key]) + ", "
        return res[:-2]

    def serialize(self) -> dict:
        return {
            "id": str(self.pk),
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
    def aggregate(pipeline):
        userList = []
        for userDict in list(User.objects().aggregate(pipeline=pipeline)):
            userDict.pop('__v')
            userDict.pop('email')
            userDict.pop('password')
            userDict.pop('verifiedEmail')
            userDict['pk'] = str(userDict['_id'])
            userDict.pop('_id')
            userList.append(User(**userDict))
        return userList

    @staticmethod
    def list_serialize(users: list) -> list:
        return [user.serialize() for user in users]