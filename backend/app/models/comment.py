from mongoengine import Document, ReferenceField, StringField, DateTimeField, IntField
from .thread import Thread
from .spark import Spark
from .user import User

class ThreadComment(Document):
    threadId = ReferenceField(Thread, required=True)
    userId = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(required=True)
    noOfReplies = IntField(default=0)

class SparkComment(Document):
    sparkId = ReferenceField(Spark, required=True)
    userId = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(required=True)
    noOfReplies = IntField(default=0)

class CommentReply(Document):
    commentId = ReferenceField(ThreadComment, required=True)
    userId = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(required=True)
