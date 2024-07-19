from flask.cli import AppGroup
from .seederAll import seed_all, undo_all
from app.models.db import environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        undo_all()
    seed_all()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_all()
