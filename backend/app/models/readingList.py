from mongoengine import EmbeddedDocument, StringField, DateTimeField

class ReadingListItem(EmbeddedDocument):
    threadId = StringField(required=True)  # ID of the thread being read
    currentSpark = StringField(required=True)  # ID of the current spark in the thread
    lastAccessTime = DateTimeField(required=True)  # Timestamp of the last access
