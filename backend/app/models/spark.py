from mongoengine import Document, StringField, ReferenceField, DateTimeField, IntField, ListField
from .thread import Thread
from .user import User

class Spark(Document):
    sparkId = StringField(required=True, unique=True)
    threadId = ReferenceField(Thread, required=True)
    userId = ReferenceField(User, required=True)
    sparkText = StringField(required=True)
    timestamp = DateTimeField(required=True)
    noOfLikes = IntField(default=0)
    likedBy = ListField(ReferenceField(User))
    noOfComments = IntField(default=0)
    prevSparkId = StringField()
    isStart = StringField()
