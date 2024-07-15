from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from flask_cors import cross_origin
from app.services.sentiment_service import analyze_sentiment
import logging

bp = Blueprint('sentiment', __name__)

@bp.route('/analyze', methods=['POST', 'OPTIONS'])
@jwt_required()
@cross_origin(supports_credentials=True)
def analyze():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    current_user = get_jwt_identity()
    jwt_data = get_jwt()
    logging.info(f"Received request from user: {current_user}")
    logging.info(f"JWT data: {jwt_data}")
    
    data = request.json
    if not data or 'text' not in data:
        logging.error("Missing 'text' in request data")
        return jsonify({"error": "Missing 'text' in request data"}), 400
    
    text = data['text']
    result = analyze_sentiment(text)
    result['user'] = current_user
    
    logging.info(f"Sending response: {result}")
    return jsonify(result)