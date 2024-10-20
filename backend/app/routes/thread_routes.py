from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.thread import Thread
from ..models.spark import Spark
from ..models.user import User
from mongoengine import DoesNotExist, ValidationError
from datetime import datetime

import mongoengine
from mongoengine import connect
from bson import ObjectId
from config import Config
from gridfs import GridFS

thread_bp = Blueprint('thread', __name__)

# Connect to MongoDB using settings from Config
connect(**Config.MONGODB_SETTINGS)  # Connects using the settings provided

@thread_bp.route('/create-thread', methods=['POST'])
@jwt_required()
def create_thread():

    try:

        # Get the pymongo database instance from mongoengine
        db = mongoengine.connection.get_db()

        # Initialize GridFS with the actual database object
        fs = GridFS(db)

        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)

        if not user:
            return jsonify({"error": "User not found."}), 404

        # Create the thread object without specifying threadId
        thread = Thread(
            threadTitle=request.form.get('title'),
            timestamp=datetime.now(),
            userId=user,
            tags = request.form.get('tags').split(','),  # Split comma-separated string back to list
            genre = request.form.get('selectedGenres').split(','),
            prompt=request.form.get('prompt')
        )
        thread.save()

        # Set the generated ObjectId as threadId
        thread.update(threadId=str(thread.id))

        # Retrieve the file from the form data
        file = request.files.get('coverImage')
        if not file or file.filename == '':
            return jsonify({"error": "No selected image"}), 400
        
        # Use the thread ID as the filename when saving to GridFS
        file_id = fs.put(file, filename=str(thread.id))  # Set filename to thread ID

        print(file_id)

        # Update the thread with the coverImage GridFS file ID
        thread.update(coverImage=file_id, threadId=str(thread.id))

        print('hello')

        return jsonify({"message": "Thread created successfully.", "threadId": str(thread.id)}), 201

    except DoesNotExist:
        return jsonify({"error": "User not found."}), 404
    except ValidationError as ve:
        return jsonify({"error": str(ve)}), 400  # Handle validation errors from MongoEngine
    except Exception as e:
        print('fuck ', e)
        return jsonify({"error": str(e)}), 500


@thread_bp.route('/cover-image/<image_id>', methods=['GET'])
def get_cover_image(image_id):
    try:
        # Get the pymongo database instance from mongoengine
        db = mongoengine.connection.get_db()
        fs = GridFS(db)

        # Find the image in GridFS
        file = fs.get(ObjectId(image_id))

        if not file:
            print('lol')
            return jsonify({"error": "Image not found"}), 404
                
        # Ensure that we have a valid mimetype. If not, set a default value.
        mimetype = file.content_type if file.content_type else 'application/octet-stream'

        # Return the image as a response with the specified mimetype
        return send_file(file, mimetype=mimetype)

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500




@thread_bp.route('/threads/<thread_id>', methods=['GET'])
def get_thread(thread_id):
    try:
        thread = Thread.objects.get(threadId=thread_id)
        print(thread.threadTitle)
        return jsonify(thread = thread.to_json(), threadTitle = thread.threadTitle), 200
    except DoesNotExist:
        return jsonify({"error": "Thread not found."}), 404



# dummy route
@thread_bp.route('/threads/<thread_id>/sparks', methods=['GET'])
def get_sparks_for_thread(thread_id):
    try:
        thread = Thread.objects.get(threadId=thread_id)
        sparks = Spark.objects.filter(threadId=thread_id)  # Adjust this based on your Spark model

        return jsonify({
            "threadTitle": thread.threadTitle,
            "sparks": sparks
        }), 200
    except DoesNotExist:
        return jsonify({"error": "Thread not found."}), 404
