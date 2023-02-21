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

2. Install Docker, NodeJS, Python, and Flask

3. Create a .env file in this directory and it must follow the format specified below

4. Run `npm install` in every service directory that runs NodeJS OR follow the instructions named `Setting up npm packages automatically`  

5. Run the command `docker compose up` in this directory to start all containers

6. To stop the backend servers, run `docker compose down` in this directory to stop all containers

## Setting up npm packages automatically
1. Make sure that your terminal is set to `Bash`
2. Run `chmod +x inp.sh`
3. Run `./inp.sh` OR `bash inp.sh`

## Environment File Format
Create a .env file here in the root directory and it MUST follow this format

```
# Node environments
NODE_ENV=development

# Hosts
FRONTEND_HOST=url
GATEWAY_HOST=url
USER_SERVICE_HOST=url
CLUB_SERVICE_HOST=url
AUTH_SERVICE_HOST=url
MATCHING_SERVICE_HOST=url

# Ports
GATEWAY_PORT=provide-a-port-number
USER_SERVICE_PORT=provide-a-port-number
CLUB_SERVICE_PORT=provide-a-port-number
AUTH_SERVICE_PORT=provide-a-port-number
MATCHING_SERVICE_PORT=provide-a-port-number

# Databases
MONGO_DB_PASSWORD=your-password-here
MONGO_HOST_URL=db-url
REDIS_HOST=db-url
REDIS_PASSWORD=your-password-here

# Secret keys
JWT_SECRET_ACCESS_TOKEN_KEY=your-key-here
JWT_SECRET_REFRESH_TOKEN_KEY=your-key-here
```

Although you can customize the .env file to your liking, here is an example of how it should look

```
# Node environments
NODE_ENV=development

# Hosts
FRONTEND_HOST=http://localhost:3000
GATEWAY_HOST=http://api-gateway-service:4000
USER_SERVICE_HOST=http://user-service-container:4001
CLUB_SERVICE_HOST=http://club-service-container:4002
AUTH_SERVICE_HOST=http://auth-service-container:4003
MATCHING_SERVICE_HOST=http://matching-service-container:8080

# Ports
GATEWAY_PORT=4000
USER_SERVICE_PORT=4001
CLUB_SERVICE_PORT=4002
AUTH_SERVICE_PORT=4003
MATCHING_SERVICE_PORT=8080

# Databases
MONGO_DB_PASSWORD=abc123
MONGO_HOST_URL=mongodb://root:abc123@user-db-container:27017/campusbuddy?directConnection=true&authSource=admin&retryWrites=true
REDIS_HOST=redis://:abc123@auth-db-container:6379
REDIS_PASSWORD=abc123

# Secret keys
JWT_SECRET_ACCESS_TOKEN_KEY=abc123
JWT_SECRET_REFRESH_TOKEN_KEY=123abc

# Dev Environment
GENERATE_TEST_USERS=0
```