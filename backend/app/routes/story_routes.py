from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.story import Story
from gridfs import GridFS
from datetime import datetime
from config import Config
from mongoengine import connect
import mongoengine
from bson import ObjectId

story_bp = Blueprint('story', __name__)

# Connect to MongoDB using settings from Config
connect(**Config.MONGODB_SETTINGS)  # Connects using the settings provided

@story_bp.route('/create-story', methods=['POST'])
@jwt_required()
def create_story():
    try:
        # Get the pymongo database instance from mongoengine
        db = mongoengine.connection.get_db()

        # Initialize GridFS with the actual database object
        fs = GridFS(db)

        # Get user identity
        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found."}), 404

        # Extract other data (title, synopsis, etc.) from request.form
        title = request.form.get('title')
        synopsis = request.form.get('synopsis')
        tags = request.form.get('tags').split(',')  # Split comma-separated string back to list
<<<<<<< HEAD
        selected_genres = request.form.get('genres').split(',')
=======
        selected_genres = request.form.get('selectedGenres').split(',')
>>>>>>> d676b9dce2375893b371baf7852e7dbab49b2412

        if not title or not synopsis:
            return jsonify({"error": "Title and synopsis are required."}), 400

        # Create the story object without saving it yet
        story = Story(
            userId=user,
            title=title,
            synopsis=synopsis,
            tags=tags,
            genre=selected_genres,
            creationTime=datetime.now()
        )
        
        # Save the story to generate the story ID
        story.save()

        # Retrieve the file from the form data
        file = request.files.get('coverImage')
        if not file or file.filename == '':
            return jsonify({"error": "No selected image"}), 400

        # Use the story ID as the filename when saving to GridFS
        file_id = fs.put(file, filename=str(story.id))  # Set filename to story ID

        # Update the story with the coverImage GridFS file ID
        story.update(coverImage=file_id, storyId=str(story.id))

        return jsonify({"message": "Story created successfully!", "storyId": str(story.id)}), 201

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while creating the story."}), 500



@story_bp.route('/<storyId>', methods=['GET'])
@jwt_required()
def get_story(storyId):
    try:
        # Find the story by ID
        story = Story.objects(id=storyId).first()

        if not story:
            return jsonify({"error": "Story not found"}), 404
        

        # Fetch the cover image from GridFS
        db = mongoengine.connection.get_db()
        fs = GridFS(db)
        cover_image_file = fs.get(story.coverImage) if story.coverImage else None
        cover_image_url = f'http://localhost:5000/story/cover-image/{story.coverImage}' if cover_image_file else None

        # Serialize the story details
        story_data = {
            "title": story.title,
            "synopsis": story.synopsis,
            "tags": story.tags,
            "genre": story.genre,
            "creationTime": story.creationTime,
            "coverImageUrl": cover_image_url,  # Pass the image URL to frontend
            "numberOfChapters": story.numberOfChapters,
            "numberOfLikes": story.numberOfLikes,
            "likedBy": [str(user.id) for user in story.likedBy],
        }

        return jsonify(story_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@story_bp.route('/cover-image/<image_id>', methods=['GET'])
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
        return jsonify({"error": str(e)}), 500
