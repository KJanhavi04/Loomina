from mongoengine import Document, StringField, ReferenceField, DateTimeField, IntField, ListField
from .thread import Thread
from .user import User

class Spark(Document):
    sparkId = StringField(unique=True)
    # threadId = ReferenceField(Thread, required=True)
    userId = ReferenceField(User, required=True)
    sparkText = StringField(required=True)
    timestamp = DateTimeField(required=False)
    noOfLikes = IntField(default=0)
    likedBy = ListField(ReferenceField(User))
    noOfComments = IntField(default=0)
    prevSparkId = StringField()
    isStart = StringField()
