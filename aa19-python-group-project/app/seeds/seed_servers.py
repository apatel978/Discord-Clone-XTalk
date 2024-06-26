# import your necessary models
from ..models.db import db
from ..models.user import User
from ..models.server import Server 
from ..models.channel import Channel  # if you have a Channel model
from ..models.member import Member  # if you have a members table

# Define a function to seed your database
def seed_data():
    # Create users
    user1 = User(username='user1', email='user1@example.com')
    user2 = User(username='user2', email='user2@example.com')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    # Create servers
    server1 = Server(name='Server 1', owner_id=user1.id, preview='Preview for Server 1')
    server2 = Server(name='Server 2', owner_id=user2.id, preview='Preview for Server 2')
    db.session.add(server1)
    db.session.add(server2)
    db.session.commit()

   
    # Add users to servers (if using a members table)
    members_data = [
        {'user_id': user1.id, 'server_id': server1.id},
        {'user_id': user1.id, 'server_id': server2.id},
        {'user_id': user2.id, 'server_id': server2.id},
    ]
    for member in members_data:
        db.session.execute(members.insert().values(member))
    db.session.commit()

    print("Database seeded successfully!")

# You can run this function to seed your database when needed
if __name__ == '__main__':
    seed_data()
