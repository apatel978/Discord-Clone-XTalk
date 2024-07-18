from app.models import db, Reaction
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

reaction_routes = Blueprint('reactions', __name__)

## DELETE a Reaction

@reaction_routes.route('/<int:reactionId>', methods=['DELETE'])
@login_required
def delete_channel(reactionId):
    # Find the reaction by ID
    reaction = Reaction.query.get(reactionId)
    if not reaction:
        return jsonify({"message": "Reaction couldn't be found"}), 404

    # Check if the current user owns the reaction
    if reaction.user_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    # Delete the reaction
    db.session.delete(reaction)
    db.session.commit()

    # Return success message
    return jsonify({"message": "Successfully deleted"}), 200
