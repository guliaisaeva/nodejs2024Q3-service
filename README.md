# REST service: Containerization, Docker and Database

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/) and Create Docker Hub account

## Downloading

```
git clone git@github.com:guliaisaeva/nodejs2024Q3-service.git
cd nodejs2024Q3-service
git checkout -b dev-docker origin/dev-docker
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

You can change the portand set the desired port number. Open the .env file if doesnt exist,create one and copy paste from env.example

```
PORT=4000
POSTGRES_PORT=5432
POSTGRES_USER=library_admin
POSTGRES_PASSWORD=supersecretpassword
POSTGRES_DB=library_db
POSTGRES_HOST=database

DATABASE_URL=postgresql://library_admin:supersecretpassword@localhost:5432/library_db?schema=public

```

To start the application:

```
npm run start
```

To start the application with Docker:

```
npm run docker:start     # Start the Docker containers
npm run docker:stop      # Stop the Docker containers
npm run docker:restart   # Restart the Docker containers
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
