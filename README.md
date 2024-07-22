# Discord-Clone-XTalk

Click the following link: [Cross-Talk](https://xtalk-h48u.onrender.com)

Cross-Talk is a clone of the website Discord, a free app that allows users to communicate in real time using text. Similarly, Cross-Talk allows for users to organize servers and smaller communities, rather than having a single central community. Users can join any public server and also create a smaller server for a group of friends. The backend of Cross-Talk is built on SQLAlchemy, Flask, and python with a PostgreSQL database. Frontend rendering is handled with React and Redux.
## How to clone

To clone this repo as `<new-project-name>`, run

```shell
git clone git@github.com:apatel978/Discord-Clone-XTalk.git <new-project-name>
```

in the directory where you want the new project to appear.

## How to install and run

Once the repo is cloned, to setup backend:

`cd <new-project-name>`, then `cd backend && pip install -r requirements.txt` \
`flask db upgrade`\
`flask seed all`

to setup frontend:
`cd <new-project-name>` then `cd react-vite && npm install`

to install
dependencies.

To run the app, type `flask run` in the backend directory and `npm run dev` in the react-vite directory.

## Features & Implementation

#### React router and components

Cross-Talk is a single-page app. All “pages” are rendered at a root url “/”. The React router handles the logic associated with component navigation and updates accordingly to the root route. The child components are done through React.

#### Frontend and Backend Interaction

Cross-Talk is currently limited to posting data and modification of the database. The frontend stores retrieves and stores necessary information for rendering the site upon entry. There are seed data in the database which can be retrieved and modified, and new information can be passed to be stored into the database as well. The current application is limited to CRUD of servers and channels.

#### Authentication

Users of the site are required to sign up if they would like to create a new server and join a server. Users can see members, servers list, and channels list. Upon account creation, the user passwords are hashed with B-crypt before being stored. Authentication uses B-crypt to match passwords which allow a user to login if the passwords match.
