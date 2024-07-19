from app.models import db, User, Server, Channel, Message, Reaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()

def seed_servers():
    demoServer = Server(name='DemoServer', owner_id=1, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    anotherDemo = Server(name='Test2', owner_id=2, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    DianaDemo = Server(name='Diana', owner_id=3, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    OlehDemo = Server(name='Oleh', owner_id=1, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    AksharDemo = Server(name='Akshar', owner_id=2, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')

    db.session.add(demoServer)
    db.session.add(anotherDemo)
    db.session.add(DianaDemo)
    db.session.add(OlehDemo)
    db.session.add(AksharDemo)
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()

# def seed_members():
#     members = [
#         Member(server_id=1, user_id=1),
#         Member(server_id=1, user_id=2),
#         Member(server_id=1, user_id=3),
#         Member(server_id=2, user_id=1),
#         Member(server_id=2, user_id=2),
#         Member(server_id=2, user_id=3),
#         Member(server_id=3, user_id=1),
#         Member(server_id=3, user_id=2),
#         Member(server_id=3, user_id=3),
#         Member(server_id=4, user_id=1),
#         Member(server_id=4, user_id=2),
#         Member(server_id=4, user_id=3),
#         Member(server_id=5, user_id=1),
#         Member(server_id=5, user_id=2),
#         Member(server_id=5, user_id=3)
#     ]

#     db.session.bulk_save_objects(members)
#     db.session.commit()

# def undo_members():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM members"))
#     db.session.commit()

def seed_channels():
    channels = [
        Channel(name='PokemonChannel', user_id=1, server_id=1),
        Channel(name='Private', user_id=2, server_id=2),
        Channel(name='DianasOnly', user_id=1, server_id=1),
        Channel(name='Shout', user_id=1, server_id=1)
    ]

    db.session.bulk_save_objects(channels)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
    db.session.commit()

def seed_messages():
    messages = [
        Message(message="hi", channel_id=1, user_id=1),
        Message(message="wasssuppp", channel_id=2, user_id=2),
        Message(message="how is it going?", channel_id=3, user_id=3),
        Message(message="i love that!", channel_id=4, user_id=2),
        Message(message="you're great :D", channel_id=1, user_id=1)
    ]

    db.session.bulk_save_objects(messages)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
    db.session.commit()

def seed_reactions():
    reactions = [
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f525.svg', message_id=1, user_id=1),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=1, user_id=2),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f383.svg', message_id=2, user_id=3),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f383.svg', message_id=2, user_id=1),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f3b1.svg', message_id=3, user_id=2),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f5a5.svg', message_id=3, user_id=3),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f433.svg', message_id=4, user_id=1),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f991.svg', message_id=4, user_id=2),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=5, user_id=3),
        Reaction(reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=5, user_id=1)
    ]

    db.session.bulk_save_objects(reactions)
    db.session.commit()

def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))
    db.session.commit()

def seed_all():
    seed_users()
    seed_servers()
    # seed_members()
    seed_channels()
    seed_messages()
    seed_reactions()

def undo_all():
    undo_reactions()
    undo_messages()
    undo_channels()
    # undo_members()
    undo_servers()
    undo_users()
