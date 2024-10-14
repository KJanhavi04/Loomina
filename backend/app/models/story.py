from mongoengine import Document, StringField, DateTimeField, IntField, ListField, ReferenceField
from .user import User

class Story(Document):
    storyId = StringField(unique=True)
    title = StringField(required=True)
    synopsis = StringField(required=True)
    creationTime = DateTimeField(required=True)
    userId = ReferenceField(User, required=True)
    genre = ListField(StringField(), default=[])  # Genre remains but used on another page
    tags = ListField(StringField(), default=[])   # New field for tags
    coverImage = StringField(default='')          # Optional field
    numberOfChapters = IntField(default=0)
    numberOfLikes = IntField(default=0)
    likedBy = ListField(ReferenceField(User), default=[])
