# backend/app/auth.py
from app import app, db
from app.models import User
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user, current_user, login_required
from flask_jwt_extended import jwt_required, create_access_token

bcrypt = Bcrypt(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['name'], email=data['email'], password=hashed_password)
    user.save()
    return jsonify(message="User registered successfully"), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        token = user.get_jwt()
        return jsonify(token=token)
    else:
        return jsonify(message="Login failed"), 401


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(message="Logged out successfully"), 200
