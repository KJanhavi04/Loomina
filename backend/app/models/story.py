from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField

class Story(Document):
    storyId = StringField(unique=True) 
    userId = ReferenceField(required=True)  
    title = StringField(max_length=100, required=True)
    synopsis = StringField(max_length=500)
    creationTime = DateTimeField(required=True)
    coverImage = StringField(max_length=255, required=False)
    numberOfChapters = int  
    numberOfLikes = int  
    likedBy = ListField(ReferenceField())