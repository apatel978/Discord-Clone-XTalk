from app.models import Channel, Server, db
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

channels_routes = Blueprint('channels', __name__)

## Edit a channel

@channels_routes.route('/<int:channelId>', methods=['PUT'])
@login_required
def update_channel(channelId):
    # Get the request data
    data = request.get_json()

    # Validate the request body
    if 'name' not in data or not (1 <= len(data['name']) <= 100):
        return jsonify({
            "message": "Bad Request",
            "errors": {"name": "Length must be between 1-100"}
        }), 400
    
    # Find the channel by ID
    channel = Channel.query.get(channelId)
    if not channel:
        return jsonify({"message": "Channel couldn't be found"}), 404
    
    # Check if the current user owns the channel
    if channel.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403
    
    # Update the channel
    channel.name = data['name']
    # channel.updated_at = datetime.utcnow()
    db.session.commit()

    # Return the updated channel
    return jsonify({
        'id': channel.id,
        'userId': channel.user_id,
        'serverId': channel.server_id,
        'name': channel.name,
        'createdAt': channel.created_at,
        'updatedAt': channel.updated_at
    }), 200

## DELETE a channel

@channels_routes.route('/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(channelId):
    # Find the channel by ID
    channel = Channel.query.get(channelId)
    if not channel:
        return jsonify({"message": "Channel couldn't be found"}), 404

    # Check if the current user owns the channel
    if channel.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    # Delete the channel
    db.session.delete(channel)
    db.session.commit()

    # Return success message
    return jsonify({"message": "Successfully deleted"}), 200
