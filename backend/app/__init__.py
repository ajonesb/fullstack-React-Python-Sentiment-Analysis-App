from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta
from config import Config

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # JWT configuration
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Make sure this matches the key used for encoding
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Adjust as needed

    # Update CORS configuration
    CORS(app, resources={r"/*": {
        "origins": ["http://localhost:3000"],  # Your React app's URL
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }})

    bcrypt.init_app(app)
    jwt.init_app(app)

    from .routes import init_app as init_routes
    init_routes(app)

    return app