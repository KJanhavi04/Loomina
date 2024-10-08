from flask import Blueprint, request, jsonify
from models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user = User(username=data['username'], email=data['email'], password=data['password'])
    user.save()
    return jsonify({"message": "User registered successfully."}), 201

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.objects().to_json()
    return jsonify(users), 200
