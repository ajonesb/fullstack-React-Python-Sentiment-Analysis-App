from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from textblob import TextBlob
from datetime import timedelta
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization"]}})
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# This should be a database in a real application
users = {}

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    if username in users:
        return jsonify({"msg": "Username already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users[username] = hashed_password
    logging.info(f"User registered: {username}")
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    stored_password = users.get(username)
    if not stored_password or not bcrypt.check_password_hash(stored_password, password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=username)
    logging.info(f"User logged in: {username}")
    return jsonify(access_token=access_token), 200

@app.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_sentiment():
    current_user = get_jwt_identity()
    logging.info(f"Analyzing sentiment for user: {current_user}")
    
    data = request.json
    if not data or 'text' not in data:
        logging.error("Missing 'text' in request data")
        return jsonify({"error": "Missing 'text' in request data"}), 400
    
    text = data['text']
    logging.debug(f"Analyzing text: {text}")
    
    # Perform sentiment analysis
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    
    # Classify sentiment
    if sentiment > 0:
        sentiment_label = 'Positive'
    elif sentiment < 0:
        sentiment_label = 'Negative'
    else:
        sentiment_label = 'Neutral'
    
    result = {
        'user': current_user,
        'text': text,
        'sentiment': sentiment,
        'sentiment_label': sentiment_label
    }
    logging.info(f"Analysis result: {result}")
    return jsonify(result)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    logging.error("Unauthorized request: Missing Authorization Header")
    return jsonify({
        'error': 'Missing Authorization Header'
    }), 401

@jwt.invalid_token_loader
def invalid_token_response(error_string):
    logging.error(f"Invalid token: {error_string}")
    return jsonify({
        'error': 'Invalid token'
    }), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)