from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User


class Server(db.Model):
    __tablename__= 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    preview = db.Column(db.String(2000))

    owner = db.relationship('User', back_populates='servers')
    users = db.relationship('User', secondary='members', back_populates='server')
    server_channels = db.relationship('Channel', back_populates='server')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'preview': self.preview
        }
