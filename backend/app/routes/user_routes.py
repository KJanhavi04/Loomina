# app/routes/user_routes.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    if user:
        user_data = {
            'userId': user.userId,
            'username': user.username,
            'email': user.email,
            'readingList': [
                {
                    'threadId': item.threadId,
                    'currentSpark': item.currentSpark,
                    'lastAccessTime': item.lastAccessTime.isoformat()
                } for item in user.readingList
            ]
        }
        return jsonify(user_data), 200
    return jsonify(message="User not found"), 404
