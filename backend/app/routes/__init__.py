from flask import Blueprint
from app.routes.auth import bp as auth_bp
from app.routes.sentiment import bp as sentiment_bp

bp = Blueprint('main', __name__)

def init_app(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(sentiment_bp, url_prefix='/sentiment')
    app.register_blueprint(bp)

@bp.route('/')
def index():
    return "Welcome to the Sentiment Analysis API"