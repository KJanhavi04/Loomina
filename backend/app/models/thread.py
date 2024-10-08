from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField
from .user import User

class Thread(Document):
    threadId = StringField(required=True, unique=True)
    threadTitle = StringField(required=True)
    timestamp = DateTimeField(required=True)
    userId = ReferenceField(User, required=True)
    noOfComments = IntField(default=0)
    noOfLikes = IntField(default=0)
    genre = StringField(required=True)
