from app.models import db, SCHEMA, environment, Message
from sqlalchemy.sql import text


def seed_messages():

    message1 = Message(
        message="hi", channel_id=1, user_id=1
    )
    message2 = Message(
        message="wasssuppp", channel_id=2, user_id=2
    )
    message3 = Message(
        message="how is it going?", channel_id=3, user_id=3
    )
    message4 = Message(
        message="i love that!", channel_id=4, user_id=2
    )
    message5 = Message(
        message="you're great :D", channel_id=1, user_id=1
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.commit()


def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
