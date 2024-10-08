# Import necessary modules and components
from flask import Blueprint, request, jsonify  # Flask utilities for creating a blueprint, handling requests, and returning JSON responses
from flask_bcrypt import Bcrypt  # Library for hashing passwords securely
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity  # JWT utilities for token creation and protection of routes
from .extensions import db, jwt  # Custom extensions for database and JWT configuration
from .models import User, Thread, Spark, ThreadComment, SparkComment, CommentReply, ReadingListItem  # Import models for database interaction
from datetime import datetime  # For handling date and time

# Create a Blueprint for authentication-related routes
bp = Blueprint('auth', __name__)

# Initialize Bcrypt for hashing passwords
bcrypt = Bcrypt()

@bp.route('/register', methods=['POST'])
def register():
    """
    Endpoint to register a new user.
    Expects a JSON payload with 'name', 'email', 'password', and optionally a 'readingList'.
    Hashes the password and saves the user to the database.
    """
    data = request.get_json()  # Get the JSON data from the request
    if User.objects(email=data['email']).first():
        return jsonify(message="User already exists"), 409  # Return a 409 conflict if the email is already registered
    
    # Hash the provided password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    # Initialize the reading list
    reading_list_data = data.get('readingList', [])
    reading_list = []

    # Parse lastAccessTime to datetime object for each item in the reading list
    for item in reading_list_data:
        try:
            item['lastAccessTime'] = datetime.fromisoformat(item['lastAccessTime'])  # Convert ISO format string to datetime object
        except ValueError:
            return jsonify({'error': 'Invalid date format for lastAccessTime'}), 400  # Return a 400 error if date format is incorrect
        reading_list.append(ReadingListItem(**item))  # Create ReadingListItem objects

    # Create a new User object
    user = User(username=data['name'], email=data['email'], password=hashed_password, readingList=reading_list)
    try:
        user.save()  # Save the new user to the database
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return a 500 internal server error if saving fails
    return jsonify(message="User registered successfully"), 201  # Return success message

@bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint for user login.
    Expects a JSON payload with 'email' and 'password'.
    Verifies the password and returns a JWT access token if successful.
    """
    data = request.get_json()  # Get the JSON data from the request
    user = User.objects(email=data['email']).first()  # Find the user by email
    if user and bcrypt.check_password_hash(user.password, data['password']):  # Check if user exists and password is correct
        access_token = create_access_token(identity=str(user.id))  # Create a JWT token for the user
        return jsonify(token=access_token), 200  # Return the token
    else:
        return jsonify(message="Login failed"), 401  # Return a 401 unauthorized if login fails

@bp.route('/user', methods=['GET'])
@jwt_required()  # Protect this route with JWT authentication
def get_user():
    """
    Endpoint to get the currently logged-in user's information.
    Requires a valid JWT token.
    Returns the user's username, email, and reading list.
    """
    user_id = get_jwt_identity()  # Get the current user's ID from the JWT token
    user = User.objects(id=user_id).first()  # Find the user by ID
    if user:
        user_data = {
            'username': user.username,
            'email': user.email,
            'readingList': [
                {
                    'threadId': item.threadId,
                    'currentSpark': item.currentSpark,
                    'lastAccessTime': item.lastAccessTime.isoformat()  # Convert datetime to ISO format for JSON
                } for item in user.readingList  # List comprehension to format each reading list item
            ]
        }
        return jsonify(user_data), 200  # Return user data
    else:
        return jsonify(message="User not found"), 404  # Return a 404 not found if user does not exist

@bp.route('/logout', methods=['POST'])
@jwt_required()  # Protect this route with JWT authentication
def logout():
    """
    Endpoint to log out the current user.
    Currently, this endpoint is just a placeholder.
    In a full implementation, it could handle token revocation.
    """
    return jsonify(message="Logged out successfully"), 200  # Return a logout success message