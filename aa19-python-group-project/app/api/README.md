# `XTalk`

## Database Schema Design

<!-- <img src="" /> -->

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/auth/me
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "createdAt": "2021-11-19 20:39:36"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": None
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "No such user exists."
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "email": "Email provided not found.",
        "password": "Password was incorrect."
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "Username is already in use."
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "email": "Invalid email",
        "username": "Username is required"
      }
    }
    ```

## SERVERS

### Get all Servers

Returns all the servers.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/servers
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Server 1",
          "preview": "img url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        },
        {
          "id": 2,
          "ownerId": 2,
          "name": "Server 2",
          "preview": "img url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```



### Get Details of the Server based on id

Returns the details of a server specified by its id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/servers/:serverId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Server1",
      "preview": "img url",
      "channels":  [
            {
              "id": 1,
              "serverId": 1,
              "userId": 1,
              "name": "Channel1",
              "created_at": "2021-11-19 20:39:36"
            },
            {
              "id": 2,
              "serverId": 1,
              "userId": 1,
              "name": "Channel2",
              "created_at": "2021-11-19 21:39:36"
            }
      ],
      "members":  [
            {
              "id": 1,
              "serverId": 1,
              "userId": 1
            },
            {
              "id": 2,
              "serverId": 1,
              "userId": 2
            }
      ]
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found"
    }
    ```

### Create a Server

Creates and returns a new server.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/servers
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Pokemon Rogue",
      "preview": "img url",
      "ownerId": 1
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Pokemon Rogue",
      "preview": "img url",
      "createdAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name is required"
      }
    }
    ```


### Edit a Server

Updates and returns an existing server.

* Require Authentication: true
* Require proper authorization: Server must belong to the current user
* Request
  * Method: PUT
  * URL: /api/servers/:serverId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Edited Pokemon Rogue",
      "preview": "imgurl_2"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Edited Pokemon Rogue",
      "preview": "imgurl_2",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Must be between 2 and 100 in length",
      }
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found"
    }
    ```

### Delete a Server

Deletes an existing server.

* Require Authentication: true
* Require proper authorization: Server must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/servers/:serverId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found"
    }
    ```

## CHANNELS

### Get all Channels of the Current Server

Returns all the channels of current server.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/servers/:serverId/channels
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "serverId": 1,
          "userId": 1,
          "name": "FAQ",
          "createdAt": "2021-11-19 20:39:36"
        },
        {
          "id": 2,
          "serverId": 1,
          "userId": 1,
          "name": "Pics",
          "createdAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```


### Create a Channel for a Server based on the Server's id

Create and return a new channel for a server specified by id.

* Require Authentication: true
* Require proper authorization: Server must belong to the current user
* Request
  * Method: POST
  * URL: /api/servers/:serverId/channels
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "General"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 3,
      "userId": 1,
      "serverId": 1,
      "name": "General",
      "createdAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Length must be between 1-100"
      }
    }
    ```

* Error response: Couldn't find a Server with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Server couldn't be found"
    }
    ```


### Edit a Channel

Update and return an existing channel.

* Require Authentication: true
* Require proper authorization: Channel must belong to the current user
* Request
  * Method: PUT
  * URL: /api/channels/:channelId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "FAQ-Updated"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 3,
      "userId": 1,
      "spotId": 1,
      "name": "FAQ-Updated",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Length must be between 1-100"
      }
    }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found"
    }
    ```

### Delete a Channel

Delete an existing channel.

* Require Authentication: true
* Require proper authorization: Channel must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/channels/:channelId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found"
    }
    ```

## MESSAGES

### Get all of the Current Channel's Messages

Return all the messages that the current channel has.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/channels/:channelId/messages
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Messages": [
        {
          "id": 1,
          "channelId": 1,
          "userId": 1,
          "message": "this is a message",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```


* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found"
    }
    ```



### Create a Message for a Channel based on the Channel's id

Create and return a new message for a channel specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/channels/:channelId/messages
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "POG"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "channelId": 1,
      "userId": 2,
      "message": "POG",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "message": "Cannot be empty"
      }
    }
    ```

* Error response: Couldn't find a Channel with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel couldn't be found"
    }
    ```


### Edit a Message

Update and return an existing message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: PUT
  * URL: /api/messages/:messageId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "POGGG?"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "channelId": 1,
      "userId": 2,
      "message": "POGGG?",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "message": "Cannot be empty",
      }
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```


### Delete a Message

Delete an existing message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/messages/:messageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```


## REACTIONS

### Get all reactions for a message

Return all the reactions that the message has.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/messages/:messageId/reactions
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reactions": [
        {
           "id": 1,
           "messageId": 1,
           "userId": 1,
           "reaction": "emoji"
        },
        {
           "id": 2,
           "messageId": 1,
           "userId": 1,
           "reaction": "emoji2"
        }
      ]
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```

### Create a Reaction for a Message based on the Message's id

Create and return a new reaction for a message specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/messages/:messageId/reactions
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "reaction": "emoji3"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "messageId": 1,
      "reaction": "emoji3"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "reaction": "Cannot be empty"
      }
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```



### Delete a Reaction

Delete an existing reaction for a Message.

* Require Authentication: true
* Require proper authorization: Reaction must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reactions/:reactionId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Reaction with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Reaction couldn't be found"
    }
    ```
