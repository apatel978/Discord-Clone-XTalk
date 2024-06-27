from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
import sqlalchemy
from datetime import datetime


class Server(db.Model):
    __tablename__= 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    preview = db.Column(db.String(2000))
    created_at =  db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    owner = db.relationship('User', back_populates='servers')
    users = db.relationship('User', secondary='members', back_populates='server')
    server_channels = db.relationship('Channel', back_populates='server',  cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'preview': self.preview
        }
