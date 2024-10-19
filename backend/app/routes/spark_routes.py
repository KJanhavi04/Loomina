from flask import Blueprint, request, jsonify
from ..models.spark import Spark
from ..models.thread import Thread
from ..models.user import User
from mongoengine import DoesNotExist, ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime


spark_bp = Blueprint('spark', __name__)

@spark_bp.route('/create-spark', methods=['POST'])
@jwt_required()
def add_spark():
    try:
        data = request.get_json()
        print(data, data['userId'])
        user = User.objects.get(userId=data['userId'])  # Assuming username is provided
        threadId = data.get('threadId')

         # Get the current user
        user_id = get_jwt_identity()
        print(user_id)
        user = User.objects(id=user_id).first()
        if not user:
            print(user)
            return jsonify({"error": "User not found."}), 404
        
        
        print(f"Received data: {data}")  # This will print the received request body

        spark = Spark(
         threadId=threadId,
         userId=user, 
         sparkText=data['sparkText'], 
         timestamp=datetime.now(),
         noOfLikes=0,
         noOfComments=0,
         likedBy=[],
         prevSparkId='',
         isStart='true'
         )
        spark.save()
        spark.update(sparkId=str(spark.id))
        return jsonify({"message": "Spark added successfully."}), 201
    
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(e)
        return jsonify({"message": "lol"}), 400
        





@spark_bp.route('/spark/<spark_id>', methods=['GET'])
def get_spark(spark_id):
    try:
        spark = Spark.objects.get(sparkId=spark_id)
        return jsonify(spark.to_json()), 200
    except DoesNotExist:
        return jsonify({"error": "Spark not found."}), 404
