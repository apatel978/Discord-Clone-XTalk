from app.models import db, SCHEMA, environment, Member
from sqlalchemy.sql import text

# 1 2 3 4 5 servers
# 1 2 3 users

def seed_members():

    m1 = Member(
        server_id=1, user_id=1)
    m2 = Member(
        server_id=1, user_id=2)
    m3 = Member(
        server_id=1, user_id=3)
    m4 = Member(
        server_id=2, user_id=1)
    m5 = Member(
        server_id=2, user_id=2)
    m6 = Member(
        server_id=2, user_id=3)
    m7 = Member(
        server_id=3, user_id=1)
    m8 = Member(
        server_id=3, user_id=2)
    m9 = Member(
        server_id=3, user_id=3)
    m10 = Member(
        server_id=4, user_id=1)
    m11 = Member(
        server_id=4, user_id=2)
    m12 = Member(
        server_id=4, user_id=3)
    m13 = Member(
        server_id=5, user_id=1)
    m14 = Member(
        server_id=5, user_id=2)
    m15 = Member(
        server_id=5, user_id=3)

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.add(m4)
    db.session.add(m5)
    db.session.add(m6)
    db.session.add(m7)
    db.session.add(m8)
    db.session.add(m9)
    db.session.add(m10)
    db.session.add(m11)
    db.session.add(m12)
    db.session.add(m13)
    db.session.add(m14)
    db.session.add(m15)
    db.session.commit()

def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))

    db.session.commit()
