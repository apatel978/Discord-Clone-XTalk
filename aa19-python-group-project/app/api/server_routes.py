from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Server, db , Channel
from app.forms import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers():

    servers = Server.query.all()
    return {
        'Servers': [server.to_dict() for server in servers]
    }


@server_routes.route('/', methods=['POST'])
@login_required
def post_server():
    # serverForm = ServerForm()
    data = request.get_json()

    if 'name' not in data:
        return jsonify({
            "message": "Bad Request",
            "errors": { "name": "Name is required" }
        }), 400

    if not (2 <= len(data['name']) <= 100):
        return jsonify({
            "message": "Bad Request",
            "errors": { "name": "Name length must be between 2 and 100" }
        }), 400

    model = Server()
    model.name = data['name']
    model.owner_id = current_user.id
    model.preview = data['preview']

    db.session.add(model)
    db.session.commit()

    return jsonify({
        'id': model.id,
        'ownerId': model.owner_id,
        'name': model.name,
        'preview': model.preview,
        'createdAt': model.created_at
    }), 201

    # if serverForm.validate_on_submit():
    #     model = Server()
    #     serverForm.populate_obj(model)
    #     db.session.add(model)
    #     db.session.commit()
    #     return redirect('/api/servers')

    # return {
    #     "message": "Bad Request",
    #     "errors": { "name": "Name is required" }
    # }, 400


@server_routes.route('/<int:id>')
@login_required
def server(id):

    server = Server.query.get(id)

    if server:
        return server.to_dict()

    return { "message": "Server couldn't be found" }, 404

## Edit A Server

## Get Channel
@server_routes.route('/<int:serverId>/channels', methods=['GET'])
@login_required
def get_all_channels(serverId):
    # Verify that the server exists
    server = Server.query.get(serverId)
    if not server:
        return jsonify({'error': 'Server not found'}), 404

    # Verify that the current user is a member of the server
    if current_user not in server.users:
        return jsonify({'error': 'Unauthorized'}), 403

    # Get all channels for the server
    channels = Channel.query.filter_by(server_id=serverId).all()

    # Format the channels for the response
    channels_response = [{
        'id': channel.id,
        'serverId': channel.server_id,
        'userId': channel.user_id,
        'name': channel.name,
        'createdAt': channel.created_at
    } for channel in channels]

    return jsonify({'Channels': channels_response}), 200

## Create a Channel

@server_routes.route('/<int:server_id>/channels', methods=['POST'])
@login_required
def create_channel(server_id):
    # Get the request data
    data = request.get_json()

    # Validate the request body
    if 'name' not in data or not (1 <= len(data['name']) <= 100):
        return jsonify({
            "message": "Bad Request",
            "errors": {"name": "Length must be between 1-100"}
        }), 400
    
    # Create a new channel
    new_channel = Channel(
        name=data['name'],
        server_id= server_id,
        user_id=current_user.id  # Assuming the user who creates the channel is the owner
    )

    # Add the new channel to the session and commit it
    db.session.add(new_channel)
    db.session.commit()

    # Return the newly created channel
    return jsonify({
        'id': new_channel.id,
        'userId': new_channel.user_id,
        'server_id': new_channel.server_id,
        'name': new_channel.name,
        'createdAt': new_channel.created_at,
        'updatedAt': new_channel.updated_at
    }), 201
