# Lendesk Take Home Assignment

Take home assignment for Lendesk.

## Requirements

-   Production level authentication api service created with NodeJS/Redis.
-   The API should be able to create a new login with a username and password, ensuring that usernames are unique. It should also be able to authenticate this login at a separate end point. It should respond with 200 OK messages for correct requests, and 401 for failing authentication requests. It should do proper error checking, with error responses in a JSON response body.

## Tech

This project is written in JavaScript and utilized below technologies.

-   NodeJS/Express
-   Redis

## Installation

-   To run, first create .env using .env.example as sample.
-   To run locally, setup Redis using above .env file, then:

```
npm install
npm start
```

-   To Run with docker, assuming you have Docker and Docker Compose installed, run below command:

```
docker-compose up --build
```

## Features

-   First you can test if this api is properly functioning by doing a GET request to: localhost:3000/api/ping, you should get PONG response.
-   In order to test registration, do a POST request to: localhost:3000/api/auth/register with { email: string, password: string } request body.
-   In order to test login, do a POST request to : localhost:3000/api/auth/login with { email: string, password: string } request body.

## Test

-   Unit test covers only auth service and token service. Test can be run with below command,

```
npm test
```

## Improvements

-   Due to time constraint: API doesn't contain below features:
    -   Swagger doc to demonstrate API.
    -   Integration test.
    -   Unit tests for custom utilities and middleware.
    -   Endpoint to test if JWT token works
