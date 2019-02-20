This very simple API was designed to small application dedicated to create and manage tasks list. Most of the API routes uses JSON Web Tokens (https://jwt.io) to authorisation and authentication users. You can get your authentication token using the first route described below. Dont forget to attach "xAuthToken" with your unique token to the headers of the requests.

For development purposes API is working only with localhost on port 4500 (http://localhost:4500/api/). If you want to use this API, you should clone it and enter "npm install" to the command line. Next enter "node server" to launch API.

sign-in:
POST /auth (http://localhost:4500/api/auth)
body of the request: (nick and password are required)

```js
{
nick: alphanum string containing 3-15 letters, trimmed,
password: string, 8-20 lenght, trimmed
}
```

example of response:
body:

```json
{
  "_id": "5c4f26f8e7fe4c32d8a57cf5",
  "nick": "nanoDW",
  "email": "nano193@gmail.com",
  "role": "user"
}
```

headers:

```json
{
  "xAuthToken": "eyJhbGciOiJIUzI1NiIsInRkcCI6IkpXVCJ9.eyJfaWQiOiI1YzRmMjZmOGU3ZmU0YzM3ZDhhNTdjZjUiLCJuaWNrIjoibmFub0RXIiwiatF0IjoxNTQ4NzY2NjkzfQ.-M2Eu_uiDCD1yQuTj3gEEaeX4c84fHs3wDj6UtA3QWA"
}
```

sign-up:
POST /users/
body of the request: (nick, pass and email are required)

```js
{
nick: alphanum string containing 3-15 letters, trimmed,
password: string, 8-20 lenght, trimmed,
email: 2 domains, min 10 lenght, trimmed
}
```

example of response:

```json
{
  "nick": "newAccount",
  "hidden": false,
  "_id": "5c5052b0ec96553b6cffc3ca",
  "email": "newaccount@gmail.com"
}
```

ALL ROUTES BELOW ARE USING TOKENS.

get list of the users - TOKEN IS REQUIRED
GET /users/

```json
{
  "data": [
    {
      "_id": "5c4f269ce7fe4c32d8a57cf4",
      "nick": "nano12",
      "last": 0,
      "role": "user"
    },
    {
      "_id": "5c4f8732d71a533f90156839",
      "nick": "nano123",
      "last": 0,
      "role": "user"
    },
    {
      "_id": "5c4f8754d71a533f9015683b",
      "nick": "nano809",
      "last": 0,
      "role": "user"
    },
    {
      "_id": "5c4f8742d71a533f9015683a",
      "nick": "nano",
      "last": 0,
      "role": "user"
    },
    {
      "_id": "5c5052b0ec96553b6cffc3ca",
      "nick": "newAccount",
      "last": 0,
      "role": "user"
    }
  ]
}
```

get list of all users - MOD function
GET /users/hidden
example of response:

```json
{
  "users": [
    {
      "last": 0,
      "hidden": false,
      "_id": "5c4f269ce7fe4c32d8a57cf4",
      "nick": "nano12",
      "email": "nanoDW@gmail.com",
      "accountCreated": "2019-01-28T15:58:20.626Z",
      "role": "user",
      "friends": [
        {
          "accepted": false,
          "_id": "5c4f59bab4a7ac542451235b",
          "user": "nanoDW",
          "userID": "5c4f26f8e7fe4c32d8a57cf5"
        },
        {
          "accepted": false,
          "_id": "5c4f5a3614127a420015b148",
          "user": "nanoDW",
          "userID": "5c4f26f8e7fe4c32d8a57cf5"
        },
        {
          "accepted": false,
          "_id": "5c4f5ad414127a420015b14a",
          "user": "nanoDW",
          "userID": "5c4f26f8e7fe4c32d8a57cf5"
        }
      ],
      "**v": 3
    },
    {
      "last": 0,
      "hidden": false,
      "_id": "5c4f8732d71a533f90156839",
      "nick": "nano123",
      "email": "nano123@gmail.com",
      "accountCreated": "2019-01-28T22:50:26.871Z",
      "role": "user",
      "friends": [],
      "**v": 0
    },
    {
      "last": 0,
      "hidden": false,
      "_id": "5c4f8754d71a533f9015683b",
      "nick": "nano809",
      "email": "nano809@gmail.com",
      "accountCreated": "2019-01-28T22:51:00.512Z",
      "role": "user",
      "friends": [],
      "**v": 0
    },
    {
      "last": 0,
      "hidden": false,
      "_id": "5c4f8742d71a533f9015683a",
      "nick": "nano",
      "email": "nano@gmail.com",
      "accountCreated": "2019-01-28T22:50:42.395Z",
      "role": "user",
      "friends": [
        {
          "accepted": false,
          "_id": "5c4f8793d71a533f9015683d",
          "user": "nanoDW",
          "userID": "5c4f26f8e7fe4c32d8a57cf5"
        }
      ],
      "**v": 1
    },
    {
      "last": 0,
      "hidden": false,
      "_id": "5c5052b0ec96553b6cffc3ca",
      "nick": "newAccount",
      "email": "newaccount@gmail.com",
      "accountCreated": "2019-01-29T13:18:40.806Z",
      "role": "user",
      "friends": [],
      "**v": 0
    },
    {
      "last": 8,
      "hidden": true,
      "_id": "5c4f26f8e7fe4c32d8a57cf5",
      "nick": "nanoDW",
      "email": "nano193@gmail.com",
      "accountCreated": "2019-01-28T15:59:52.014Z",
      "role": "user",
      "friends": [
        {
          "accepted": true,
          "_id": "5c4f59bab4a7ac542451235a",
          "user": "nano12",
          "userID": "5c4f269ce7fe4c32d8a57cf4"
        },
        {
          "accepted": true,
          "_id": "5c4f5a3614127a420015b147",
          "user": "nano12",
          "userID": "5c4f269ce7fe4c32d8a57cf4"
        },
        {
          "accepted": true,
          "_id": "5c4f5ad414127a420015b149",
          "user": "nano12",
          "userID": "5c4f269ce7fe4c32d8a57cf4"
        }
      ],
      "**v": 5
    }
  ]
}
```

get user of given id
GET /users/user/:id
example of response:

```json
{
  "nick": "nano12",
  "_id": "5c4f269ce7fe4c32d8a57cf4",
  "last": 0,
  "accountCreated": "2019-01-28T15:58:20.626Z",
  "role": "user"
}
```

get my profile
GET /users/me
example of response:

```json
{
  "user": {
    "last": 8,
    "hidden": true,
    "_id": "5c4f26f8e7fe4c32d8a57cf5",
    "nick": "nanoDW",
    "email": "nano193@gmail.com",
    "accountCreated": "2019-01-28T15:59:52.014Z",
    "role": "user",
    "friends": [
      {
        "accepted": true,
        "_id": "5c4f59bab4a7ac542451235a",
        "user": "nano12",
        "userID": "5c4f269ce7fe4c32d8a57cf4"
      },
      {
        "accepted": true,
        "_id": "5c4f5a3614127a420015b147",
        "user": "nano12",
        "userID": "5c4f269ce7fe4c32d8a57cf4"
      },
      {
        "accepted": true,
        "_id": "5c4f5ad414127a420015b149",
        "user": "nano12",
        "userID": "5c4f269ce7fe4c32d8a57cf4"
      }
    ],
    "__v": 5
  }
}
```

update password or email
PUT /users/settings
body of request:

```js
{
    password: string, 8-20 lenght, trimmed,
email: 2 domains, min 10 lenght, trimmed
}
```

or:

```js
{
    password: string, 8-20 lenght, trimmed
}
```

or:

```js
{
email: 2 domains, min 10 lenght, trimmed
}
```

example of response:

```js
Password has been updated.
```

```js
Email has been updated.
```

change visibility status
PUT /users/visibility
example of response:

```js
false;
```

or

```js
true;
```

add new friend
PUT /users/friends
body of request:

```js
{
_id: _id,
nick: nick: alphanum string containing 3-15 letters, trimmed
}
```

example of response:

```js
Success! Added newAccount to your friends list.
```

accept a friend invitation
PUT /users/friends/:id
body of request:

```js
{
  _id: _id;
}
```

example of response:

```js
Success! Invitation has been accepted.
```

deleting a friend
DELETE /users/friends/:id
example of response:

```js
Success! Your friends list has been updated.
```

deleting an account
DELETE /users/me
example of response:

```js
Account succesfully deleted.
```

changing user permissions ADMIN ONLY
PUT /users/user/:id/role

example of response:

```js
{
    "nick": "nano12",
    "_id": "5c4f269ce7fe4c32d8a57cf4",
    "last": 0,
    "role": "mod"
}
```

add a task
POST /tasks/

body of request:

```js
{
      description: 2-160 characters, required,
      priority: number, 1-5, default: 1,
      deadline: "2019-01-28T15:58:20.626Z"
    }
```

example of response:

```js
{
  nick, description, priority, deadline, created;
}
```

get your tasks
GET /tasks/

example of response:

````js
{
  "tasks":
  [
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
}
  ],
    "givenTasks":
  [
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
},
  {
  nick, description, priority, deadline, created;
}
  ]
}

get user statistics
GET /users/statistics

example of response:
```json
{
    "response": {
        "nick": "nanoDW",
        "createdTasks": 0,
        "accountCreated": "2019-02-08T13:31:26.300Z",
        "friendsAmount": 0,
        "activeTasks": 0,
        "doneTasks": 0,
        "givenTasks": 0,
        "receivedMessages": 0,
        "sentMessages": 0
    }
}```
````
