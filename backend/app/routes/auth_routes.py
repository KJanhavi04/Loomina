# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db, jwt
from ..models.user import User

from datetime import datetime

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.objects(email=data['email']).first():
        return jsonify(message="User already exists"), 409
    
    # Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    reading_list_data = data.get('readingList', [])  # Ensure proper validation for this field if needed
    reading_list = []
    
    # Create the user
    user = User(username=data['name'], email=data['email'], password=hashed_password, readingList=reading_list)
    
    try:
        user.save()
        user.update(userId=str(user.id))  # Assign userId after saving
        
        # Generate access token
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify(message="User registered successfully", token=access_token), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Check if user exists
    user = User.objects(email=data['email']).first()
    if not user:
        return jsonify(message="User not found"), 404
    
    # Verify password
    if not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify(message="Incorrect password"), 401
    
    # Generate access token
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify(token=access_token), 200
