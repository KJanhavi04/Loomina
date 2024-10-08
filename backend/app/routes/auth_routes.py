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

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(token=access_token), 200
    return jsonify(message="Login failed"), 401
