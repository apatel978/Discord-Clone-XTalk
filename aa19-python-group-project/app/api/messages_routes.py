from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db, Reaction

message_routes = Blueprint('messages', __name__)


##Edit a message
@message_routes.route('/<int:messageId>', methods=['PUT'])
@login_required
def edit_messages(messageId):
    data = request.get_json()

    # Validate the request body
    if not (len(data['message']) > 1):
        return jsonify({
        "message": "Bad Request",
        "errors": { "message": "Cannot be empty" }
        }), 400

    # Find the channel by ID
    message = Message.query.get(messageId)
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


#Get all Reactions for a Message
@message_routes.route('/<int:messageId>/reactions')
@login_required
def messages(messageId):
    reactions = Reaction.query.filter(Reaction.message_id==messageId).all()

    #If message does not exist
    if not reactions:
        return jsonify({ "message": "Message couldn't be found" }), 404

    return {
        'Reactions': [ reaction.to_dict() for reaction in reactions ]
    }



#Create A Reaction For A Message
@message_routes.route('/<int:messageId>/reactions', methods=['POST'])
@login_required
def post_reaction(messageId):
    #Check if message exists
    message = Message.query.get(messageId)
    if not message:
        return { "message": "Message couldn't be found" }, 404

    data = request.get_json()

    model = Reaction()
    model.reaction = data['reaction']
    model.user_id = current_user.id
    model.message_id = messageId

    db.session.add(model)
    db.session.commit()

    return jsonify({
        'id': model.id,
        'userId': model.user_id,
        'messageId': model.message_id,
        'reaction': model.reaction
    }), 200
