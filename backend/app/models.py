# backend/app/models.py
from app import db, login_manager
from flask_login import UserMixin
from flask_jwt_extended import create_access_token
from mongoengine import StringField, EmailField, IntField, Document

@login_manager.user_loader
def load_user(user_id):
    return User.objects(pk=user_id).first()

class User(db.Document, UserMixin):
    username = StringField(max_length=20, unique=True, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(max_length=60, required=True)

    def get_jwt(self):
        token = create_access_token(identity=str(self.id))
        return token
