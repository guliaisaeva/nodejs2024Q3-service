# Logging & Error Handling and Authentication & Authorization

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Postman - [Download & Install Postman](https://www.postman.com/downloads/)
- Swagger - [Swagger](http://localhost:4000/doc)

## Downloading

```
git clone git@github.com:guliaisaeva/nodejs2024Q3-service.git
cd nodejs2024Q3-service
git checkout -b dev-log-auth origin/dev-log-auth
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

Application is running on port by default: http://localhost:4000
Swagger is running on port: http://localhost:4000/doc

You can change the portand set the desired port number. Open the .env file if doesnt exist,create one and copy paste from env.example

```
PORT=4000


POSTGRES_PORT=5432
POSTGRES_USER=library_admin
POSTGRES_PASSWORD=supersecretpassword
POSTGRES_DB=library_db
POSTGRES_HOST=database

DATABASE_URL=postgresql://library_admin:supersecretpassword@localhost:5432/library_db?schema=public

JWT_SECRET=55555_jwt_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=55555_refresh_jwt_secret
JWT_REFRESH_EXPIRES_IN=7d

```

To start the application:

```
npm  start
```

To test the authentication process, follow these steps using Postman and swagger:

Signup:

```
Endpoint: POST http://localhost:4000/api/signup
```

Request Body (raw JSON):

```
{
  "login": "UserName",
  "password": "password123"
}
```

Login:

```
POST http://localhost:4000/api/login
```

Request Body (raw JSON):

```
{
  "login": "UserName",
  "password": "password123"
}
```

Success Response:

```
{
  "accessToken": "yourAccessTokenHere",
  "refreshToken": "yourRefreshTokenHere"
}
```

## Authorization in Swagger:

For authenticated endpoints in Swagger, you need to include the Bearer token in the Authorization header:

```
Key: Authorization
Value: Bearer {yourAccessTokenHere}
```

This will allow you to authenticate requests using the accessToken you obtained during login or signup.

# I wish you happy review and end of our Nodejs Course.Have a nice day and good luck!

To start the application with Docker:

```

npm run docker:start # Start the Docker containers
npm run docker:stop # Stop the Docker containers
npm run docker:restart # Restart the Docker containers

```

To start the prisma studio:

```

npx prisma studio

```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```

npm run test

```

To run only one of all test suites

```

npm run test -- <path to suite>

```

To run all test with authorization

```

npm run test:auth

```

To run only specific test suite with authorization

```

npm run test:auth -- <path to suite>

```

### Auto-fix and format

```

npm run lint

```

```

npm run format

```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

```

```

```

```
