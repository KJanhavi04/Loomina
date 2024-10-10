from flask import Blueprint, request, jsonify
from ..models.spark import Spark
from ..models.thread import Thread
from ..models.user import User
from mongoengine import DoesNotExist

spark_bp = Blueprint('spark', __name__)

@spark_bp.route('/create-spark', methods=['POST'])
def add_spark():
    try:
        data = request.get_json()
        print(data)
        user = User.objects.get(userId=data['userId'])  # Assuming username is provided
        # thread = Thread.objects.get(threadId=data['threadId'])
        print(data)
        spark = Spark(sparkId=data['sparkId'], userId=user, sparkText=data['sparkText'], timestamp=data['timestamp'])
        spark.save()
        return jsonify({"message": "Spark added successfully."}), 201
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
