from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db

message_routes = Blueprint('messages', __name__)


##Edit a message
@message_routes.route('/<int:messageid>', methods=['PUT'])
@login_required
def edit_messages(messageid):
    data = request.get_json()

    # Validate the request body
    if not (len(data['message']) > 1):
        return jsonify({
        "message": "Bad Request",
        "errors": { "message": "Cannot be empty" }
        }), 400

    # Find the channel by ID
    message = Message.query.get(messageid)
    #Check if message exists
    if not message:
        return jsonify({ "message": "Message couldn't be found" }), 404
    # Check if the current user owns the message
    if message.user_id != current_user.id:
        return jsonify({ "message": "Unauthorized" }), 403

    #Update the message and commit
    message.message=data['message']
    db.session.commit()

    # Return the message
    return jsonify({
        'id': message.id,
        'message': message.message,
        'channelId': message.channel_id,
        'userId': message.user_id,
        'createdAt': message.created_at,
        'updatedAt': message.updated_at
    }), 200


## Delete A Message
@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_a_message(messageId):
    message = Message.query.get(messageId)

    if not message:
        return jsonify({ "message": "Message couldn't be found" }), 404

    if message.user_id != current_user.id:
        return jsonify({ "message": "Unauthorized" }), 403

    db.session.delete(message)
    db.session.commit()
    return jsonify({ "message": "Successfully deleted" }), 200
