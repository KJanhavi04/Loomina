# backend/app/auth.py

from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .extensions import db, jwt
from .models import User

bp = Blueprint('auth', __name__)

bcrypt = Bcrypt()

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.objects(email=data['email']).first():
        return jsonify(message="User already exists"), 409
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['name'], email=data['email'], password=hashed_password)
    user.save()
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

@bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    if user:
        user_data = {
            'username': user.username,
            'email': user.email
        }
        return jsonify(user_data), 200
    else:
        return jsonify(message="User not found"), 404

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200
