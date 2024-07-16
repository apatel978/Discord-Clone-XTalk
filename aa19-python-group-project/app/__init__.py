import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channels_routes import channels_routes
from .api.upload_routes import upload_routes
from .api.retrieve_routes import retrieve_routes
from .api.messages_routes import message_routes
from .api.reaction_routes import reaction_routes
from .seeds import seed_commands
from .config import Config
from .models.message import Message


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes
# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Setup SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(channels_routes, url_prefix='/api/channels')
app.register_blueprint(upload_routes, url_prefix='/api')
app.register_blueprint(retrieve_routes, url_prefix='/api')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(reaction_routes, url_prefix='/api/reactions')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')



@socketio.on('join')
def on_join(data):
    # print(f"hello from join: {data}")
    username = data['username']
    channel = data['channel']
    join_room(channel)
    print('joined room')

@socketio.on('leave')
def on_leave(data):
    # print(f"hello from leave: {data}")
    username = data['username']
    channel = data['channel']
    leave_room(channel)
    print('left room')

@socketio.on('message')
def handle_message(data):
    # print(f'hello from message: {data}')
    channel = data['channel']
    message = data['message']
    user_id = data['userId']

    new_message = Message (message=message, channel_id=channel, user_id=user_id)
    db.session.add(new_message)
    db.session.commit()
    emit('message', {'message': message}, to=channel)

if __name__ == '__main__':
    print("starting socketio")
    socketio.run(app, debug=True)
