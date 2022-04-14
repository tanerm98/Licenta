# Proiect Licenta - Mustafa Taner
    Licenta
    Performance Monitor - iOS Application Size, Memory Usage and Launch Duration - Monitor
    


## Steps for initializing services
    Database: cwd = Database
        $ docker-compose up
    Performance Measuring App: cwd = BusinessLogicService
        $ python3 -m venv venv
        $ source venv/bin/activate
        $ pip3 install -r requirements.txt
        $ pip3 install -U pip google-api-python-client
        $ python3 src/app.py
    Login Service: cwd = BackendLogicServices/LoginService
        $ npm install
        $ npm run start
    Web App: cwd = BackendLogicServices/AppService
        $ npm install
        $ npm run start
    Frontend: cwd = Frontend/my-app
        $ npm install
        $ npm run start
    
## REST API Endpoints, Documentation and Usage:
    Login Service: PORT 3003
    Backend Service: PORT 3002
    Business Service: PORT 3004
    Frontend Service: PORT 3000

### REGISTER
    Path: localhost:3003/api/v1/users/register
    Type: POST
    Body:
        {
           "username": "Guest2",
            "password": "1234"
        }
    Returns:
        {
            "response": {
                "username": "Guest2",
                "id": 6
            }
        }
    
### LOGIN
    Path: localhost:3003/api/v1/users/login
    Type: POST
    Authorized roles: ADMIN, MANAGER, USER
    Body:
        {
            "username": "Guest2",
            "password": "1234"
        }
    Returns:
        {
            "response": {
                "role": "MANAGER",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJSb2xlIjoiTUFOQUdFUiIsImlhdCI6MTYyMTc1Mzk2MSwiYXVkIjoicHcgY2xpZW50IiwiaXNzIjoicHcgYmFja2VuZCIsInN1YiI6InB3In0.Ii-D51xvdn-0fuuHOhj6quNDxjGYLG8FytuWHmW9jgw"
            }
        }

### GET_USERS
    Path: localhost:3003/api/v1/users/
    Type: GET
    Authorized roles: ADMIN
    Returns:
        {
            "response": [
                {
                    "username": "admin",
                    "id": 1,
                    "roleId": 1
                },
                {
                    "username": "Taner",
                    "id": 2,
                    "roleId": 2
                },
                {
                    "username": "Corina",
                    "id": 3,
                    "roleId": 2
                },
                {
                    "username": "Teodor",
                    "id": 4,
                    "roleId": 2
                },
                {
                    "username": "Guest",
                    "id": 5,
                    "roleId": 3
                },
                {
                    "username": "Guest2",
                    "id": 6,
                    "roleId": 2
                }
            ]
        }
    
### SET_ROLE
    Path: localhost:3003/api/v1/users/:USER_ID/role/:ROLE_ID
    Type: PUT
    Parameters: USER_ID & ROLE_ID

### GET_ROLES    
    Path: localhost:3003/api/v1/roles
    Type: GET
    Authorized roles: ADMIN
    Returns:
        {
            "response": [
                {
                    "value": "ADMIN",
                    "id": 1
                },
                {
                    "value": "MANAGER",
                    "id": 2
                },
                {
                    "value": "USER",
                    "id": 3
                }
            ]
        }
    
### ADD_ROLE
    Path: localhost:3003/api/v1/roles
    Type: POST
    Authorized roles: ADMIN
    Body:
        {
            "value": "GUEST"
        }
    Returns:
        {
            "response": {
                "value": "GUEST",
                "id": 4
            }
        }

### GET_USER_ANALYTICS
    Path: localhost:3002/api/v1/users/analytics
    Type: GET
    Authorized roles: ADMIN
    Body:
        {
            "limit": 2
        }
    Returns:
        {
            "response": {
                "registers_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": "5.0000000000000000"
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": "22.0000000000000000"
                    }
                ],
                "logins_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": "9.0000000000000000"
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": "8.0000000000000000"
                    }
                ],
                "jobs_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": "10.0000000000000000"
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": "8.0000000000000000"
                    }
                ]
            }
        }
