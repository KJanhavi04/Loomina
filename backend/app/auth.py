# Import necessary modules and components
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .extensions import db, jwt
from .models import User, ReadingListItem
from datetime import datetime

# Create a Blueprint for authentication-related routes
bp = Blueprint('auth', __name__)

# Initialize Bcrypt for hashing passwords
bcrypt = Bcrypt()

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.objects(email=data['email']).first():
        return jsonify(message="User already exists"), 409
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    reading_list_data = data.get('readingList', [])
    reading_list = []

    for item in reading_list_data:
        try:
            item['lastAccessTime'] = datetime.fromisoformat(item['lastAccessTime'])
        except ValueError:
            return jsonify({'error': 'Invalid date format for lastAccessTime'}), 400
        reading_list.append(ReadingListItem(**item))

    user = User(username=data['name'], email=data['email'], password=hashed_password, readingList=reading_list)
    try:
        user.save()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify(message="User registered successfully"), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(token=access_token), 200
    else:
        return jsonify(message="Login failed"), 401

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200

@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id, fresh=False)
    return jsonify(access_token=new_access_token), 200
