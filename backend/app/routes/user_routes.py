# app/routes/user_routes.py
from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User

from config import Config
from bson import ObjectId
from gridfs import GridFS
from mongoengine import connect
import mongoengine
import io

user_bp = Blueprint('user', __name__)

connect(**Config.MONGODB_SETTINGS)  # Connects using the settings provided

@user_bp.route('/user/upload-profile', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        db = mongoengine.connection.get_db()
        fs = GridFS(db)

        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found."}), 404
        
        file = request.files.get('userProfileImage')
        
        if not file or file.filename == '':
            return jsonify({"error": "No selected image"}), 400

        # Store image in GridFS
        file_id = fs.put(file, filename=str(user_id))

        # Update user with the file's ObjectId
        user.update(userProfileImage=file_id)

        return jsonify({"message": "Image uploaded successfully!", "ImageId": str(file_id)}), 201
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error" : "An error occurred"}), 500

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
            ],
            'userProfileImage': str(user.userProfileImage) if user.userProfileImage else None  # Store the ObjectId of the image
        }
        return jsonify(user_data), 200
    return jsonify(message="User not found"), 404

@user_bp.route('/user/profile-image/<image_id>', methods=['GET'])
def get_profile_image(image_id):
    try:
        # Get the pymongo database instance from mongoengine
        db = mongoengine.connection.get_db()
        fs = GridFS(db)

        # Find the image in GridFS
        file = fs.get(ObjectId(image_id))

        print(image_id)

        if not file:
            print('lol')
            return jsonify({"error": "Image not found"}), 404
                
        # Ensure that we have a valid mimetype. If not, set a default value.
        mimetype = file.content_type if file.content_type else 'application/octet-stream'

        # Return the image as a response with the specified mimetype
        return send_file(file, mimetype=mimetype)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@user_bp.route('/user/<user_id>', methods=['GET'])
def get_username(user_id):
    user = User.objects(userId=user_id).first()  # Get the user by userId
    if user:
        return jsonify({"username": user.username}), 200
    else:
        return jsonify({"error": "User not found."}), 404
