from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Server, db , Channel, Member, User
from app.forms import ServerForm
from sqlalchemy.orm import joinedload

server_routes = Blueprint('servers', __name__)

##Get all servers
@server_routes.route('/')
@login_required
def servers():

    servers = Server.query.all()
    return {
        'Servers': [server.to_dict() for server in servers]
    }

## Create a Server
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

## Get a server by ID
@server_routes.route('/<int:id>')
@login_required
def server(id):

    server = Server.query.options(joinedload(Server.server_channels)).filter_by(id=id).first()
    channels = [{'id': channel.id, 'serverId': channel.server_id, 'userId': channel.user_id, 'name': channel.name, 'createdAt': channel.created_at} for channel in server.server_channels]
    members = db.session.query(User).join(Member, User.id == Member.user_id).filter(Member.server_id == id).all()
    members_usernames = [{ 'id': member.id, 'username': member.username, 'serverId': id, 'userId': member.id } for member in members]
    # server = Server.query.get(id)
    # channels = Channel.query.filter_by(id=id).all()
    # channel_list = [channel.to_dict() for channel in channels]

    if server:
        # dictServer = server.to_dict()
        # dictServer["channels"] = channel_list
        server_data = {
            'id': server.id,
            'ownerId': server.owner_id,
            'name': server.name,
            'preview': server.preview,
            'channels': channels,
            'members': members_usernames
        }
        return server_data

    return { "message": "Server couldn't be found" }, 404

## Edit A Server
@server_routes.route('/<int:serverId>', methods=['PUT'])
@login_required
def edit_a_server(serverId):
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

    server = Server.query.get(serverId)

    if not server:
        return jsonify({ "message": "Server couldn't be found" }), 404

    if server.owner_id != current_user.id:
        return jsonify({ "message": "Unauthorized" }), 403

    server.name = data['name']
    server.preview = data['preview']

    db.session.commit()

    return jsonify({
        'id': server.id,
        'ownerId': server.owner_id,
        'name': server.name,
        'preview': server.preview,
        'createdAt': server.created_at,
        'updatedAt': server.updated_at
    }), 200

## Delete A Server
@server_routes.route('/<int:serverId>', methods=['DELETE'])
@login_required
def delete_a_server(serverId):
    server = Server.query.get(serverId)

    if not server:
        return jsonify({ "message": "Server couldn't be found" }), 404

    if server.owner_id != current_user.id:
        return jsonify({ "message": "Unauthorized" }), 403

    db.session.delete(server)
    db.session.commit()

    return jsonify({ "message": "Successfully deleted" }), 200

## Leave A Server
@server_routes.route('/<int:serverId>/leave', methods=['DELETE'])
@login_required
def leave_server(serverId):
    try:
        # Find the membership record
        membership = Member.query.filter_by(server_id=serverId, user_id=current_user.id).first()
        if not membership:
            return jsonify({ "message": "User is not a member of this server" }), 404
        db.session.delete(membership)
        db.session.commit()
        return jsonify({ "message": "Successfully left the server" }), 200
    except Exception as e:
        return jsonify({ "message": "Internal Server Error" }), 500


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
