from app.models import db, SCHEMA, environment, Reaction
from sqlalchemy.sql import text

def seed_reactions():

    demoRxn = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f525.svg', message_id=1, user_id=1)
    otherRxn = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=1, user_id=2)
    r3 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f383.svg', message_id=2, user_id=3)
    r4 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f383.svg', message_id=2, user_id=1)
    r5 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f3b1.svg', message_id=3, user_id=2)
    r6 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f5a5.svg', message_id=3, user_id=3)
    r7 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f433.svg', message_id=4, user_id=1)
    r8 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f991.svg', message_id=4, user_id=2)
    r9 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=5, user_id=3)
    r10 = Reaction(
        reaction='https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f368.svg', message_id=5, user_id=1)

    db.session.add(demoRxn)
    db.session.add(otherRxn)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)
    db.session.commit()

def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
