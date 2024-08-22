from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialize JWT Manager using the key from config.py
    jwt = JWTManager(app)

    # Enable CORS
    CORS(app)

    # Register blueprints or routes
    from .routes import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app
