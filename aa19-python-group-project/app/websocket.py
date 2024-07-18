from flask_socketio import SocketIO
import functools
from flask_socketio import SocketIO, disconnect
from flask_login import current_user


socketio = SocketIO()

def setup_socketio(*args, **kwargs):
    socketio.init_app(*args, **kwargs)

def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped
