from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField, ListField
from .user import User

class Thread(Document):
    threadId = StringField(unique=True)
    threadTitle = StringField(required=True)
    timestamp = DateTimeField(required=True)
    userId = ReferenceField(User, required=True)
    noOfComments = IntField(default=0)
    noOfLikes = IntField(default=0)
    prompt = StringField(required=True)
    genre = ListField(StringField(), required=True)  # Changed to ListField to allow multiple genres
