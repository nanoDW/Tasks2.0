This very simple API was designed to small application dedicated to create and manage tasks list. Most of the API routes uses JSON Web Tokens (https://jwt.io) to authorisation and authentication users. You can get your authentication token using the first route described below. Dont forget to attach "xAuthToken" with your unique token to the headers of the requests.

For development purposes API is working only with localhost on port 4500 (http://localhost:4500/api/). If you want to use this API, you should clone it and enter "npm install" to the command line. Next enter "node server" to launch API.

sign-in:
POST `/auth` (`http://localhost:4500/api/auth`)
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
POST `/users/`
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
GET `/users/`

```json
{
  "data": [
    {
      "_id": "5c4f269ce7fe4c32d8a57cf4",
      "nick": "nano12",
      "last": 0,
      "role": "user"
    },
    ...
  ]
}
```

get user of given id
GET `/users/:id`
example of response:

```json
{
  "nick": "nano12",
  "_id": "5c4f269ce7fe4c32d8a57cf4",
  "last": 0,
  "accountCreated": "2019-01-28T15:58:20.626Z"
}
```

get my profile
GET `/data/`
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
     ...
    ],
    "__v": 5
  }
}
```

get user statistics:
GET `/data/account`

example of response:

```json
{
  "response": {
    "nick": "user",
    "createdTasks": 0,
    "accountCreated": "2019-02-21T13:18:08.085Z",
    "friendsAmount": 0,
    "activeTasks": 0,
    "doneTasks": 0,
    "givenTasks": 0,
    "receivedMessages": 0,
    "sentMessages": 0
  }
}
```

add new friend
POST `/friends/`
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
PUT `/friends/:id`
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
DELETE `/friends/:id`
example of response:

```js
Success! Your friends list has been updated.
```

update password or email
PUT `/me/data`
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
[
Password has been updated.
]
```

```js
[
Email has been updated.
]
```

change visibility status
PUT `/me/visibility`

example of response:

```js
false;
```

or

```js
true;
```

deleting an account
DELETE `/me/`
example of response:

```js
Account succesfully deleted.
```

add a task
POST `/tasks/`

body of request:

```js
description: 2 - 160 charackters, required,
priority: number 1-5, required,
deadline: string
```

example of response:

```json
{
  "task": {
    "priority": 5,
    "created": "2019-02-24T10:03:17.536Z",
    "done": false,
    "note": "",
    "_id": "5c726be520db5b16ccc2a19f",
    "user": "5c6ea510b047ed4424b4c942",
    "description": "Create an Youtube movies learning app",
    "__v": 0
  }
}
```

get my tasks:
GET `/tasks/`

example of response:

```json
{
  "tasks": [
    {
      "priority": 5,
      "created": "2019-02-24T10:03:17.536Z",
      "done": false,
      "note": "",
      "_id": "5c726be520db5b16ccc2a19f",
      "user": "5c6ea510b047ed4424b4c942",
      "description": "Create an Youtube movies learning app",
      "__v": 0
    }
  ],
  "sentTasks": []
}
```

edit task
PUT `/tasks/edition/:id`

body of request:

```js
priority: 1-5,
deadline: Date
```

example of response:

```json
{
  "task": {
    "priority": 3,
    "created": "2019-02-24T10:03:17.536Z",
    "done": false,
    "note": "",
    "_id": "5c726be520db5b16ccc2a19f",
    "user": "5c6ea510b047ed4424b4c942",
    "description": "Create an Youtube movies learning app",
    "__v": 0
  }
}
```

complete task:
PUT `/tasks/completed/:id`

body of request:

```js
note: 1-480 charackters
```

example of response:

```json
{
  "task": {
    "priority": 3,
    "created": "2019-02-24T10:03:17.536Z",
    "done": true,
    "note": "It was hard",
    "_id": "5c726be520db5b16ccc2a19f",
    "user": "5c6ea510b047ed4424b4c942",
    "description": "Create an Youtube movies learning app",
    "__v": 0,
    "deadline": "2019-02-24T10:16:37.784Z"
  }
}
```

delete task:
DELETE `/tasks/deleted/:id`

example of response:
`Task succesfully deleted`

sent task to another user:
POST `/sent/

body of request:

```js
user: id of user,
description: 1-160 charackters,
priority: 1-5
```

example of response:

````json
{
    "task": {
        "priority": 3,
        "created": "2019-02-24T10:37:13.355Z",
        "done": false,
        "note": "",
        "_id": "5c7273d9d22f983350d995fb",
        "author": "user",
        "description": "Create an Youtube movies learning app",
        "accepted": false
    }
}

accept a task:
PUT `/sent/acceptance/:id`

example of response:
```json
{
    "task": {
        "priority": 3,
        "created": "2019-02-24T12:31:32.473Z",
        "done": false,
        "note": "",
        "_id": "5c728ea47314cd1e98e756b0",
        "author": "nanoDW",
        "user": "5c5d88138c6def1958a0f6ff",
        "description": "new task",
        "accepted": true,
        "__v": 0
    }
}
````

reject a task
PUT `sent/rejection/:id`

body of request:

```js
note: 1-480 charackters, required
```

example of response:

```json
{
  "task": {
    "priority": 3,
    "created": "2019-02-24T12:31:45.428Z",
    "done": false,
    "note": "It was hard",
    "_id": "5c728eb17314cd1e98e756b1",
    "author": "nanoDW",
    "user": "5c5d88138c6def1958a0f6ff",
    "description": "accept it",
    "accepted": false,
    "__v": 0
  }
}
```

send message:
POST `/messages/`

body of request:

```js
userID: id,
topic: 1-48 chars,
text: 1-480 chars
```

example of response:

```json
{
  "message": {
    "deletedByAuthor": false,
    "deletedByUser": false,
    "seen": false,
    "_id": "5c72bf4c033b924d889bacce",
    "author": "admin",
    "authorID": "5c5d88138c6def1958a0f6ff",
    "adressedTo": "nanoDW",
    "userID": "5c5d84ae8c6def1958a0f6fe",
    "topic": "topic",
    "text": "text",
    "sent": "2019-02-24T15:59:08.542Z",
    "__v": 0
  }
}
```

get all messages:
GET `/messages/`

example of response:

```json
{
  "receivedMessages": [],
  "sentMessages": [
    {
      "deletedByAuthor": false,
      "deletedByUser": false,
      "seen": false,
      "_id": "5c72bf4c033b924d889bacce",
      "author": "admin",
      "authorID": "5c5d88138c6def1958a0f6ff",
      "adressedTo": "nanoDW",
      "userID": "5c5d84ae8c6def1958a0f6fe",
      "topic": "topic",
      "text": "text",
      "sent": "2019-02-24T15:59:08.542Z",
      "__v": 0
    }
  ]
}
```

set message status to seen:
PUT `/messages/:id`

example of response:

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
