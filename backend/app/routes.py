from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

users_db = {}  # In-memory store. Replace with your database logic.

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if email in users_db:
        return jsonify({'msg': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    users_db[email] = {
        'name': name,
        'email': email,
        'password': hashed_password
    }
    return jsonify({'msg': 'User created successfully'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_db.get(email)

    if user and check_password_hash(user['password'], password):
        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=email, expires_delta=expires)
        return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'Invalid credentials'}), 401

@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'msg': f'Welcome {current_user}! This is a protected route.'}), 200
