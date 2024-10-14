from flask import Flask
from flask_cors import CORS
from config import Config
from .extensions import db, jwt
from .routes.auth_routes import auth_bp
from .routes.user_routes import user_bp
from .routes.thread_routes import thread_bp
from .routes.story_routes import story_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Add CORS configuration
    CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"], headers=["Content-Type", "Authorization"])

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(thread_bp, url_prefix='/thread')
    app.register_blueprint(story_bp, url_prefix='/story')

    return app
