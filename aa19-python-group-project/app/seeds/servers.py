from app.models import db, SCHEMA, environment, Server
from sqlalchemy.sql import text

def seed_servers():

    demoServer = Server(
        name='DemoServer', owner_id=1, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    anotherDemo = Server(
        name='Test2', owner_id=2, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    DianaDemo = Server(
        name='Diana', owner_id=3, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    OlehDemo = Server(
        name='Oleh', owner_id=1, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
    AksharDemo = Server(
        name='Akshar', owner_id=2, preview='https://i1.sndcdn.com/artworks-000666620167-6kjqim-t500x500.jpg')
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
