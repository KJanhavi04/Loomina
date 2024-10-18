# app/models/reading_list.py
from mongoengine import EmbeddedDocument, StringField, DateTimeField

class ReadingListItem(EmbeddedDocument):
    threadId = StringField(required=True)
    currentSpark = StringField()
    lastAccessTime = DateTimeField(required=True)
