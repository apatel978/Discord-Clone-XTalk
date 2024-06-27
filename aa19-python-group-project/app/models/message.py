from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__= 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id',  ondelete='CASCADE'), nullable=False, )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at =  db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages',single_parent=True, cascade='all, delete-orphan')
    reactions = db.relationship('Reaction', back_populates='message', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'channelId': self.channel_id,
            'userId': self.user_id,
            'message': self.message,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
