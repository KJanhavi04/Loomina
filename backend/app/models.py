from app import db
from mongoengine import StringField, EmailField

class User(db.Document):
    username = StringField(max_length=20, unique=True, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(max_length=60, required=True)
