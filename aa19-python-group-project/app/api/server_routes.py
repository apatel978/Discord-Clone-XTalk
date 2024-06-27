from flask import Blueprint, jsonify, redirect
from flask_login import login_required
from app.models import Server, db
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
