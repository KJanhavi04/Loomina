# Import necessary fields and classes from mongoengine
from mongoengine import EmailField, Document, StringField, ListField, ReferenceField, DateTimeField, IntField, EmbeddedDocument, EmbeddedDocumentField

# Define an embedded document for items in the user's reading list
class ReadingListItem(EmbeddedDocument):
    threadId = StringField(required=True)  # ID of the thread being read
    currentSpark = StringField(required=True)  # ID of the current spark in the thread
    lastAccessTime = DateTimeField(required=True)  # Timestamp of the last access

# Define a User model representing users in the application
class User(Document):
    username = StringField(max_length=20, required=True, unique=True)  # Username of the user, must be unique
    email = StringField(required=True, unique=True)  # Email of the user, must be unique
    password = StringField(max_length=60, required=True)  # Hashed password of the user
    readingList = ListField(EmbeddedDocumentField(ReadingListItem), default=list)  # List of reading list items

# Define a Thread model representing discussion threads
class Thread(Document):
    threadId = StringField(required=True, unique=True)  # Unique identifier for the thread
    timestamp = DateTimeField(required=True)  # Timestamp when the thread was created
    userId = ReferenceField(User, required=True)  # Reference to the user who created the thread
    noOfComments = IntField(default=0)  # Number of comments in the thread
    noOfLikes = IntField(default=0)  # Number of likes for the thread
    genre = StringField(required=True)  # Genre or category of the thread

# Define a Spark model representing sparks (responses) in threads
class Spark(Document):
    sparkId = StringField(required=True, unique=True)  # Unique identifier for the spark
    threadId = ReferenceField(Thread, required=True)  # Reference to the thread this spark belongs to
    userId = ReferenceField(User, required=True)  # Reference to the user who created the spark
    sparkText = StringField(required=True)  # Text content of the spark
    timestamp = DateTimeField(required=True)  # Timestamp when the spark was created
    noOfLikes = IntField(default=0)  # Number of likes for the spark
    likedBy = ListField(ReferenceField(User))  # List of users who liked the spark
    noOfComments = IntField(default=0)  # Number of comments on the spark
    prevSparkId = StringField()  # ID of the previous spark, if any (used for chaining sparks)
    isStart = StringField()  # Indicates if this spark is the starting point in a thread

# Define a ThreadComment model representing comments on threads
class ThreadComment(Document):
    threadId = ReferenceField(Thread, required=True)  # Reference to the thread this comment belongs to
    userId = ReferenceField(User, required=True)  # Reference to the user who made the comment
    text = StringField(required=True)  # Text content of the comment
    timestamp = DateTimeField(required=True)  # Timestamp when the comment was created
    noOfReplies = IntField(default=0)  # Number of replies to the comment

# Define a SparkComment model representing comments on sparks
class SparkComment(Document):
    sparkId = ReferenceField(Spark, required=True)  # Reference to the spark this comment belongs to
    userId = ReferenceField(User, required=True)  # Reference to the user who made the comment
    text = StringField(required=True)  # Text content of the comment
    timestamp = DateTimeField(required=True)  # Timestamp when the comment was created
    noOfReplies = IntField(default=0)  # Number of replies to the comment

# Define a CommentReply model representing replies to comments
class CommentReply(Document):
    commentId = ReferenceField(ThreadComment, required=True)  # Reference to the comment this reply belongs to
    userId = ReferenceField(User, required=True)  # Reference to the user who made the reply
    text = StringField(required=True)  # Text content of the reply
    timestamp = DateTimeField(required=True)  # Timestamp when the reply was created