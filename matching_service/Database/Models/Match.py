from mongoengine import Document, \
 BooleanField, ReferenceField

from Database.Models.User import User

class Match(Document):
    User_1_ID = ReferenceField(User, required=True) # User who swiped
    User_2_ID = ReferenceField(User, required=True) # User who the primary user swiped for
    Conversation_Active = BooleanField(default=True)
    meta = {'collection': 'matches', 'strict': False}

