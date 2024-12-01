## prerequisite

1. Docker
2. Docker-Compose
3. Postgres Driver
4. Node Version 16+
5. NPM
6. Typescript

## installation

*** make sure you open the _DOCKER_ before do things below
*** make sure you open the _DOCKER_ before do things below
*** make sure you open the _DOCKER_ before do things below

*** please run backend before frontend

### backend application (make sure you're at the root folder)
```
cd data-anonymous-backend
npm run bootstrap // this line will init database and seed the data then run the server
```

*** if you ever run the server once using `npm run bootstrap` you can use `npm run start:dev` instead

### frontend application (make sure you're at the root folder)
```
cd data-anonymous-frontend
npm run dev
```

*** after frontend start, you can use `user1` to sign in

## how to run the test

we have only backend application test

```
cd data-anonymous-backend
npm run test // (or npm run test:cov for check test coverage)
```

## application architecture

### entity design

- users (one to many) posts
- posts (one to many) comments
- categories (one to many) posts

### server architecture

- inspired by clean architecture (onion) written by NestJS
- using repository to communicate with database and query data from persistence
- from repository to service for do business logic that encapsulated inside the each domain
- from service to usecase level to separate case which we need client to call
- controllers are the presentation to expose to client for communication

## key libraries

### frontend

- Zustand : state management library which is easy to use and manage global state
- NextAuth : manage authentication and authorization
- TailwindCSS : styling with utility classes to ship project fast

### backend

- NestJS : core framework to build server application
- JWT : do the cryptographic tasks like access token to manage authorization and authentication

