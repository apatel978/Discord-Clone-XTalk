from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

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
