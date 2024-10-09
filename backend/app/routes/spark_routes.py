from flask import Blueprint, request, jsonify
from ..models.spark import Spark
from ..models.thread import Thread
from ..models.user import User
from mongoengine import DoesNotExist

spark_bp = Blueprint('spark', __name__)

# @spark_bp.route('/sparks', methods=['POST'])
# def add_spark():
#     data = request.json
#     user = User.objects.get(username=data['username'])  # Assuming username is provided
#     thread = Thread.objects.get(threadId=data['threadId'])
    
#     spark = Spark(sparkId=data['sparkId'], threadId=thread, userId=user, sparkText=data['sparkText'], timestamp=data['timestamp'])
#     spark.save()
#     return jsonify({"message": "Spark added successfully."}), 201

from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime


@spark_bp.route('/sparks', methods=['POST'])
@jwt_required() #To ensure that user is logged in
def add_spark():
    data = request.json
    current_user_id = get_jwt_identity()  # Get the logged-in user's ID from JWT

    try:
        # Fetch user by their ID and thread by threadId
        user = User.objects.get(id=current_user_id)
        thread = Thread.objects.get(threadId=data['threadId'])
        
        # Create a new Spark with the auto-generated MongoDB ObjectId
        spark = Spark(
            threadId=thread,
            userId=user,
            sparkText=data['sparkText'],
            timestamp=datetime.now()
        )
        spark.save()  # This saves the Spark and assigns an ObjectId automatically

        return jsonify({
            "message": "Spark added successfully.",
            "sparkId": str(spark.id)  # Return the generated ObjectId as the sparkId
        }), 201
    except (DoesNotExist, Exception) as e:
        return jsonify({"error": str(e)}), 400



@spark_bp.route('/sparks/<spark_id>', methods=['GET'])
def get_spark(spark_id):
    try:
        spark = Spark.objects.get(sparkId=spark_id)
        return jsonify(spark.to_json()), 200
    except DoesNotExist:
        return jsonify({"error": "Spark not found."}), 404
