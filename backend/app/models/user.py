# app/models/user.py
from mongoengine import Document, StringField, ListField, EmbeddedDocumentField, ObjectIdField
from .reading_list import ReadingListItem

class User(Document):
    userId = StringField(unique=True)
    userProfileImage = ObjectIdField(required=False)
    username = StringField(max_length=20, required=True, unique=True)
    email = StringField(required=True, unique=True)
    password = StringField(max_length=60, required=True)
    readingList = ListField(EmbeddedDocumentField(ReadingListItem), default=list)
