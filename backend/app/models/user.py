from mongoengine import Document, StringField, ListField, EmbeddedDocumentField
from .reading_list import ReadingListItem  # Assuming ReadingListItem is in a separate file

class User(Document):
    username = StringField(max_length=20, required=True, unique=True)
    email = StringField(required=True, unique=True)
    password = StringField(max_length=60, required=True)
    readingList = ListField(EmbeddedDocumentField(ReadingListItem), default=list)
