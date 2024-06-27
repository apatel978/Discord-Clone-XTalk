from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import Server, db , Channel
from app.forms import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
# @login_required
def servers():

    servers = Server.query.all()
    return {
        'Servers': [server.to_dict() for server in servers]
    }


@server_routes.route('/', methods=['POST'])
@login_required
def post_server():
    serverForm = ServerForm()
    if serverForm.validate_on_submit():
        model = Server()
        serverForm.populate_obj(model)
        db.session.add(model)
        db.session.commit()
        return redirect('/api/servers')

    return {
        "message": "Bad Request",
        "errors": { "name": "Name is required" }
    }, 400


@server_routes.route('/<int:id>')
@login_required
def server(id):

    server = Server.query.get(id)

    if server:
        return server.to_dict()

    return { "message": "Server couldn't be found" }, 404

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
