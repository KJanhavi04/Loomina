from flask import Flask
from flask_cors import CORS
from config import Config
from .extensions import db, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Add CORS configuration
    CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"], headers=["Content-Type", "Authorization"])

    # Import and register blueprints
    from . import auth
    app.register_blueprint(auth.bp)

    return app
