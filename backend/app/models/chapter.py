from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField

class Chapter(Document):
    chapterId = StringField(unique=True)  # Separate field for chapter ID
    storyId = ReferenceField(required=True)  # Reference to the story this chapter belongs to
    title = StringField(max_length=100, required=True)
    content = StringField(required=True)  
    creationTime = DateTimeField(required=True)
    numberOfLikes = int  
    likedBy = ListField(ReferenceField())