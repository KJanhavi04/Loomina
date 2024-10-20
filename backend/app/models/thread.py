from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField, ListField, ObjectIdField
from .user import User

class Thread(Document):
    threadId = StringField(unique=True)
    threadTitle = StringField(required=True)
    timestamp = DateTimeField(required=True)
    userId = ReferenceField(User, required=True)
    noOfComments = IntField(default=0)
    noOfLikes = IntField(default=0)
    prompt = StringField(required=True)
    coverImage = ObjectIdField(required=False)
    genre = ListField(StringField(), required=True)
    tags = ListField(StringField(), required=True)
