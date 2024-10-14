from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.story import Story
from ..models.user import User
from mongoengine import DoesNotExist, ValidationError
from datetime import datetime

story_bp = Blueprint('story', __name__)

# @story_bp.route('/create-story', methods=['POST'])
# @jwt_required()
# def create_story():
#     try:
#         # Check if the request contains JSON data
#         if not request.is_json:
#             return jsonify({"error": "Invalid input, expected JSON format."}), 400

#         data = request.json
#         print("Received data:", data)  # Log incoming data for debugging

#         # Validate required fields
#         required_fields = ['title', 'synopsis', 'tag']  # Expecting 'tags' here
#         for field in required_fields:
#             if field not in data:
#                 return jsonify({"error": f"Missing required field: {field}"}), 400

#         # Get the current user
#         user_id = get_jwt_identity()
#         user = User.objects(id=user_id).first()
#         if not user:
#             return jsonify({"error": "User not found."}), 404

#         # Create the new story with tags
#         new_story = Story(
#             title=data['title'],
#             synopsis=data['synopsis'],
#             tags=data.get('tag', []),  # Get tags from request
#             genre= [],
#             userId=user,
#             creationTime=datetime.utcnow(),
#             coverImage=data.get('coverImage', ''),  # Optional cover image
#             numberOfChapters=0,
#             numberOfLikes=0,
#             likedBy=[]
#         )
#         new_story.save()

#         new_story.update(storyId=str(new_story.id))


#         return jsonify({"message": "Story created successfully!", "story": new_story.to_json()}), 201

#     except ValidationError as e:
#         return jsonify({"error": str(e)}), 400
#     except Exception as e:
#         return jsonify({"error": "An error occurred while creating the story."}), 500

@story_bp.route('/create-story', methods=['POST'])
@jwt_required()
def create_story():
    try:
        # Handle form data from request
        title = request.form.get('title')
        synopsis = request.form.get('synopsis')
        tags = request.form.get('tags')
        genres = request.form.get('genres')
        cover_image = request.files.get('coverImage')

        # Convert tags and genres from JSON string to list
        tags = json.loads(tags) if tags else []
        genres = json.loads(genres) if genres else []

        # Get the current user
        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found."}), 404

        # Handle cover image (if provided)
        cover_image_url = ''
        if cover_image:
            # You would typically save the file to a static folder or cloud storage
            # and store the file path/URL in the database.
            cover_image_url = cover_image.filename  # Example: Save this file or URL in the database

        # Create the new story with tags and genres
        new_story = Story(
            title=title,
            synopsis=synopsis,
            tags=tags,
            genres=genres,
            userId=user,
            creationTime=datetime.utcnow(),
            coverImage=cover_image_url,  # Use the file name or URL
            numberOfChapters=0,
            numberOfLikes=0,
            likedBy=[]
        )
        new_story.save()

        # Update the storyId
        new_story.update(storyId=str(new_story.id))

        return jsonify({"message": "Story created successfully!", "story": new_story.to_json()}), 201

    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred while creating the story."}), 500
