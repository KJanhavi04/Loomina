from .user_routes import user_bp
from .thread_routes import thread_bp
from .spark_routes import spark_bp
from .comment_routes import comment_bp

def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(thread_bp)
    app.register_blueprint(spark_bp)
    app.register_blueprint(comment_bp)
