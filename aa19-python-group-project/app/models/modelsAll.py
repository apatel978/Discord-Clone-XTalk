from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Member(db.Model):
    __tablename__ = 'members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    servers = db.relationship('Server', back_populates='owner')
    server = db.relationship('Server', secondary=add_prefix_for_prod('members'), back_populates='users')
    channel_user = db.relationship('Channel', back_populates='owner')
    messages = db.relationship('Message', back_populates='user')
    rxns = db.relationship('Reaction', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Server(db.Model):
    __tablename__= 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    preview = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    owner = db.relationship('User', back_populates='servers')
    users = db.relationship('User', secondary=add_prefix_for_prod('members'), back_populates='server')
    server_channels = db.relationship('Channel', back_populates='server', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'preview': self.preview
        }

class Channel(db.Model):
    __tablename__= 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    owner = db.relationship('User', back_populates='channel_user')
    server = db.relationship('Server', back_populates='server_channels')
    messages = db.relationship('Message', back_populates='channel', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.server_id,
            'userId': self.user_id,
            'name': self.name,
            'createdAt': self.created_at
        }

class Message(db.Model):
    __tablename__= 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages', single_parent=True, cascade='all, delete-orphan')
    reactions = db.relationship('Reaction', back_populates='message', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'channelId': self.channel_id,
            'userId': self.user_id,
            'message': self.message
        }

class Reaction(db.Model):
    __tablename__= 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reaction = db.Column(db.String(1000), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    message = db.relationship('Message', back_populates='reactions')
    user = db.relationship('User', back_populates='rxns')

    def to_dict(self):
        return {
            'id': self.id,
            'messageId': self.message_id,
            'userId': self.user_id,
            'reaction': self.reaction
        }
