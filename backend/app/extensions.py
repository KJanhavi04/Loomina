# backend/app/extensions.py

from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_mongoengine import MongoEngine

db = MongoEngine()
login_manager = LoginManager()
jwt = JWTManager()
