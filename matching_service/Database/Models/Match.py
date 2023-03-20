from mongoengine import Document, \
 BooleanField, ReferenceField

from Database.Models.User import User

class Match(Document):
    User_1_ID = ReferenceField(User, required=True) # User who swiped
    User_2_ID = ReferenceField(User, required=True) # User who the primary user swiped for
    Conversation_Active_For_User_1 = BooleanField(default=True)
    Conversation_Active_For_User_2 = BooleanField(default=True)
    seen_by_user_1 = BooleanField(default=False)
    seen_by_user_2 = BooleanField(default=False)
    meta = {'collection': 'matches', 'strict': False}

