from .db import db, environment, SCHEMA, add_prefix_for_prod


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
