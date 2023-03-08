from mongoengine import Document, \
StringField, BooleanField, DateTimeField

class Swipe(Document):
    primaryUserID = StringField() # User who swiped
    targetUserID = StringField() # User who the primary user swiped for
    datetime = DateTimeField() # Datetime the user swiped
    like = BooleanField() # True if the primary user liked the target user, False otherwise
    meta = {'collection': 'swipes', 'strict': False}