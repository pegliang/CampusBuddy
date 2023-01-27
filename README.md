# Campus Buddy Backend

## Backend Services

### Gateway
All incoming requests from the public will be handled by this Gateway. It is the responsibility of the gateway to send the requests to the other microservices.

### User Service
Microservice that will handle all user requests such as login, registration, and user lookup

### Auth Service
Microservice that will handle all authentication requests when logging in, logging out, changing user settings, and modifying user sessions.

## Setup
All backend functions and hosting are carried out using Docker

1. Pull this repository

2. Install Docker and NodeJS (recommended)

3. Create a .env file in this directory and it must follow the format specified below

4. Run the command `docker compose up` in this directory to start all containers

5. To stop the backend servers, run `docker compose down` in this directory to stop all containers

## Environment File Format
Create a .env file here in the root directory and it MUST follow this format

```
# Ports
GATEWAY_PORT=provide-a-port-number
USER_SERVICE_PORT=provide-a-port-number
CLUB_SERVICE_PORT=provide-a-port-number
AUTH_SERVICE_PORT=provide-a-port-number

# Databases
MONGO_DB_PASSWORD=your-password-here
```

Although you can customize the .env file to your liking, here is an example of how it should look

```
# Ports
GATEWAY_PORT=4000
USER_SERVICE_PORT=4001
CLUB_SERVICE_PORT=4002
AUTH_SERVICE_PORT=4003

# Databases
MONGO_DB_PASSWORD=abc123
```
```
