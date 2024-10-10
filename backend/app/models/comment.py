from mongoengine import Document, ReferenceField, StringField, DateTimeField, IntField, ListField
from .thread import Thread
from .spark import Spark
from .user import User
from .chapter import Chapter
from .story import Story

class ThreadComment(Document):
    commentId = StringField(unique=True)  
    threadId = ReferenceField(Thread, required=True)
    userId = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(required=True)
    noOfReplies = IntField(default=0)

class SparkComment(Document):
    commentId = StringField(unique=True)  
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


class StoryComment(Document):
    commentId = StringField(unique=True)  
    storyId = ReferenceField(Story, required=True) 
    userId = ReferenceField(User, required=True)  
    content = StringField(required=True)  # Content of the comment
    timestamp = DateTimeField(required=True)
    numberOfLikes = IntField(default=0)  # Total number of likes on the comment
    likedBy = ListField(ReferenceField(User))  # List of users who liked the comment


class ChapterComment(Document):
    commentId = StringField(unique=True)  # Separate field for comment ID
    chapterId = ReferenceField(Chapter, required=True)  # Reference to the chapter this comment belongs to
    userId = ReferenceField(User, required=True)  # User who made the comment
    content = StringField(required=True)  # Content of the comment
    timestamp = DateTimeField(required=True)
    numberOfLikes = IntField(default=0)  # Total number of likes on the comment
    likedBy = ListField(ReferenceField(User))  # List of users who liked the comment

