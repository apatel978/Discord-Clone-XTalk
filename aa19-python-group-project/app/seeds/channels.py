# from http import server
# from app.models import db, SCHEMA, environment, Channel
# from sqlalchemy.sql import text

# def seed_channels():

#     PokemonChannel = Channel(
#         name='PokemonChannel', user_id=1, server_id=1)
#     Private = Channel(
#         name='Private', user_id=2, server_id=2)
#     DianasOnly = Channel(
#         name='DianasOnly', user_id=1, server_id=1)
#     Shout = Channel(
#         name='Shout', user_id=1, server_id=1)
#     db.session.add(PokemonChannel)
#     db.session.add(Private)
#     db.session.add(DianasOnly)
#     db.session.add(Shout)
#     db.session.commit()

# def undo_channels():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM channels"))

#     db.session.commit()
