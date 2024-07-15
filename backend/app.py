from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from config import Config

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization"]}})
    bcrypt.init_app(app)
    jwt.init_app(app)

    from app.routes import init_app as init_routes
    init_routes(app)

    from app.utils import unauthorized_response, invalid_token_response
    jwt.unauthorized_loader(unauthorized_response)
    jwt.invalid_token_loader(invalid_token_response)

    return app