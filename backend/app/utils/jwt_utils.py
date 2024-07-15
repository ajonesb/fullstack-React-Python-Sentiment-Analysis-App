from flask import jsonify
from app import jwt

import logging

logging.basicConfig(level=logging.DEBUG)

@jwt.unauthorized_loader
def unauthorized_response(callback):
    logging.error(f"Unauthorized request: {callback}")
    return jsonify({
        'error': 'Missing or invalid Authorization Header'
    }), 401

@jwt.invalid_token_loader
def invalid_token_response(error_string):
    logging.error(f"Invalid token: {error_string}")
    return jsonify({
        'error': 'Invalid token'
    }), 401