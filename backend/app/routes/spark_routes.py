from flask import Blueprint, request, jsonify
from models.spark import Spark
from models.thread import Thread
from models.user import User
from mongoengine import DoesNotExist

spark_bp = Blueprint('spark', __name__)

@spark_bp.route('/sparks', methods=['POST'])
def add_spark():
    data = request.json
    user = User.objects.get(username=data['username'])  # Assuming username is provided
    thread = Thread.objects.get(threadId=data['threadId'])
    
    spark = Spark(sparkId=data['sparkId'], threadId=thread, userId=user, sparkText=data['sparkText'], timestamp=data['timestamp'])
    spark.save()
    return jsonify({"message": "Spark added successfully."}), 201

@spark_bp.route('/sparks/<spark_id>', methods=['GET'])
def get_spark(spark_id):
    try:
        spark = Spark.objects.get(sparkId=spark_id)
        return jsonify(spark.to_json()), 200
    except DoesNotExist:
        return jsonify({"error": "Spark not found."}), 404
