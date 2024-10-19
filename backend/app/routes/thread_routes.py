from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.thread import Thread
from ..models.user import User
from mongoengine import DoesNotExist, ValidationError
from datetime import datetime

thread_bp = Blueprint('thread', __name__)

@thread_bp.route('/create-thread', methods=['POST'])
@jwt_required()
def create_thread():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Invalid input, expected JSON format."}), 400

    data = request.json
    print(data)

    # Validate required fields
    required_fields = ['threadTitle', 'genre']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    try:
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)

        # Create the thread object without specifying threadId
        thread = Thread(
            threadTitle=data['threadTitle'],
            timestamp=datetime.now(),
            userId=user,
            genre=data['genre'],
            prompt=data['prompt']
        )
        thread.save()

        # Set the generated ObjectId as threadId
        thread.update(threadId=str(thread.id))

        return jsonify({"message": "Thread created successfully.", "threadId": str(thread.id)}), 201

    except DoesNotExist:
        return jsonify({"error": "User not found."}), 404
    except ValidationError as ve:
        return jsonify({"error": str(ve)}), 400  # Handle validation errors from MongoEngine
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@thread_bp.route('/threads/<thread_id>', methods=['GET'])
def get_thread(thread_id):
    try:
        thread = Thread.objects.get(threadId=thread_id)
        print(thread.threadTitle)
        return jsonify(thread = thread.to_json(), threadTitle = thread.threadTitle), 200
    except DoesNotExist:
        return jsonify({"error": "Thread not found."}), 404
