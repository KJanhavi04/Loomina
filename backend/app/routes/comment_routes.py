from flask import Blueprint, request, jsonify
from models.comment import ThreadComment, SparkComment
from models.thread import Thread
from models.user import User
from mongoengine import DoesNotExist

comment_bp = Blueprint('comment', __name__)

@comment_bp.route('/thread_comments', methods=['POST'])
def add_thread_comment():
    data = request.json
    user = User.objects.get(username=data['username'])  # Assuming username is provided
    thread = Thread.objects.get(threadId=data['threadId'])
    
    comment = ThreadComment(threadId=thread, userId=user, text=data['text'], timestamp=data['timestamp'])
    comment.save()
    return jsonify({"message": "Comment added successfully."}), 201

@comment_bp.route('/spark_comments', methods=['POST'])
def add_spark_comment():
    data = request.json
    user = User.objects.get(username=data['username'])  # Assuming username is provided
    spark = Spark.objects.get(sparkId=data['sparkId'])
    
    comment = SparkComment(sparkId=spark, userId=user, text=data['text'], timestamp=data['timestamp'])
    comment.save()
    return jsonify({"message": "Comment added successfully."}), 201
