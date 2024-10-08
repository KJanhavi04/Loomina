from flask import Blueprint, request, jsonify
from ..models.thread import Thread
from ..models.user import User
from mongoengine import DoesNotExist

thread_bp = Blueprint('thread', __name__)

@thread_bp.route('/threads', methods=['POST'])
def create_thread():
    data = request.json
    user = User.objects.get(username=data['username'])  # Assuming username is provided
    thread = Thread(threadId=data['threadId'], threadTitle=data['threadTitle'], timestamp=data['timestamp'], userId=user)
    thread.save()
    return jsonify({"message": "Thread created successfully."}), 201

@thread_bp.route('/threads/<thread_id>', methods=['GET'])
def get_thread(thread_id):
    try:
        thread = Thread.objects.get(threadId=thread_id)
        return jsonify(thread.to_json()), 200
    except DoesNotExist:
        return jsonify({"error": "Thread not found."}), 404
