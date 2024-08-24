from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_mongoengine import MongoEngine
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'd2b1d6a4b9da4721ae111b331d481168'
app.config['MONGODB_SETTINGS'] = {
    'db': 'Loomina',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
jwt = JWTManager(app)

# Add CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"], headers=["Content-Type", "Authorization"])

from app import routes, auth  # Import routes and authentication logic
