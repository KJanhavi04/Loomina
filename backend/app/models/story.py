from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField, IntField, ObjectIdField
from bson import ObjectId  # This is required to handle ObjectIds in MongoDB
from .user import User

class Story(Document):
    storyId = StringField(unique=True)
    userId = ReferenceField(User, required=True)
    title = StringField(required=True)
    synopsis = StringField(required=True)
    genre = ListField(StringField(), required=True)
    tags = ListField(StringField(), required=True)
    creationTime = DateTimeField(required=True)
    coverImage = ObjectIdField(required=False)  # Changed to ObjectIdField to store GridFS file_id
    numberOfChapters = IntField(default=0)  # Changed to IntField
    numberOfLikes = IntField(default=0)  # Changed to IntField
    likedBy = ListField(ReferenceField(User))
