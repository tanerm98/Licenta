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
        $ python3 src/app.py SAU $ python3 src/mock_app.py
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
    
### CREATE_WORKSPACE
    Path: localhost:3002/api/v1/workspaces/create
    Type:   POST
    Authorized roles: ADMIN, MANAGER
    Body:
        {
            "app_bundle_id": "app.bundle2",
            "description": "Mock description",
            "repository_link": "www.fdsfds.com"
        }
    Returns:
        {
            "response": {
                "app_bundle_id": "app.bundle2",
                "description": "Mock description",
                "repository_link": "www.fdsfds.com"
            }
        }

### GET_WORKSPACE_INFO
    Path: localhost:3002/api/v1/workspaces/:APP_BUNDLE_ID
    Type: GET
    Authorized roles: ADMIN, MANAGER, USER
    Parameters: APP_BUNDLE_ID
    Returns:
        {
            "response": {
                "app_bundle_id": "app.bundle2",
                "description": "Mock description",
                "repository_link": "www.fdsfds.com"
            }
        }
   
### DELETE_WORKSPACE 
    Path: localhost:3002/api/v1/workspaces/:APP_BUNDLE_ID
    Type: DELETE
    Authorized roles: ADMIN, MANAGER
    Parameters: APP_BUNDLE_ID

### GET_ALL_WORKSPACES    
    Path: localhost:3002/api/v1/workspaces/
    Type: GET
    Authorized roles: ADMIN, MANAGER, USER
    Returns:
        {
            "response": [
                {
                    "app_bundle_id": "Fitbit.Concentration",
                    "description": "Simple Memory Game",
                    "repository_link": "github.com/tanerm98/ProiectIDP"
                },
                {
                    "app_bundle_id": "App.Snake",
                    "description": "Classic Snake Game",
                    "repository_link": "www.abc.com"
                },
                {
                    "app_bundle_id": "Game.GTA",
                    "description": "GTA 5 Game",
                    "repository_link": "www.def.com"
                },
                {
                    "app_bundle_id": "Tool.Reader",
                    "description": "PDF Reader",
                    "repository_link": "www.ghi.com"
                }
            ]
        }
    
### RUN_PERFORMANCE_TEST_JOB
    Path: localhost:3002/api/v1/jobs/run/:APP_BUNDLE_ID
    Type: POST
    Authorized roles: ADMIN, MANAGER
    Parameters: APP_BUNDLE_ID
    Body:
        {
            "file_id": "1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk",
            "app_path": "Concentration.app",
            "device": "iPhone 11",
            "launch_type": "WARM",
            "launch_nr": "2",
            "duration_limit": "1",
            "memory_limit": "50",
            "size_limit": "100",
            "repo_github_token": "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",
            "repo_owner": "tanerm98",
            "repo_name": "Licenta",
            "pr_number": "1"
        }
    Returns:
        {
            "response": {
                "id": 11,
                "summary": "Performance Metrics of Fitbit.Concentration Application Tested from this PR\n---------------------------------------------------------------\n> APP SIZE: 1MB  :white_check_mark:\n> FIRST LAUNCH AFTER INSTALL - DURATION: 2914ms  :x:\n> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.36MB  :white_check_mark:\n---------------------------------------------------------------\n> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 2188ms  :x: | MEMORY USAGE: 5.35MB  :white_check_mark:\n> DEVICE: iPhone 8 | LAUNCH TYPE: COLD | DURATION: 2623ms  :x: | MEMORY USAGE: 5.37MB  :white_check_mark:\n> DEVICE: iPhone 11 | LAUNCH TYPE: WARM | DURATION: 2304ms  :x: | MEMORY USAGE: 5.33MB  :white_check_mark:\n> DEVICE: iPhone 11 | LAUNCH TYPE: COLD | DURATION: 3252ms  :x: | MEMORY USAGE: 5.38MB  :white_check_mark:\n----------------------------------------------------\n",
                "app_bundle_id": "Fitbit.Concentration",
                "pr_id": 1
            }
        }
    
### GET_JOBS_FOR_WORKSPACE
    Path: localhost:3002/api/v1/jobs/bundle/:APP_BUNDLE_ID
    Type: GET
    Authorized roles: ADMIN, MANAGER, USER
    Parameters: APP_BUNDLE_ID
    Returns:
        {
            "response": [
                {
                    "id": 1,
                    "app_bundle_id": "Fitbit.Concentration",
                    "pr_id": 0,
                    "summary": "Performance Metrics of Fitbit.Concentration Application Tested from this PR\\n---------------------------------------------------------------\\n> APP SIZE: 1MB  :white_check_mark:\\n> FIRST LAUNCH AFTER INSTALL - DURATION: 2058ms  :x:\\n> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.43MB  :white_check_mark:\\n---------------------------------------------------------------\\n> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 2142ms  :x: | MEMORY USAGE: 5.32MB  :white_check_mark:\\n> DEVICE: iPhone 8 | LAUNCH TYPE: COLD | DURATION: 2936ms  :x: | MEMORY USAGE: 5.42MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: WARM | DURATION: 2084ms  :x: | MEMORY USAGE: 5.37MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: COLD | DURATION: 3390ms  :x: | MEMORY USAGE: 5.45MB  :white_check_mark:\\n----------------------------------------------------\\n"
                },
                {
                    "id": 2,
                    "app_bundle_id": "Fitbit.Concentration",
                    "pr_id": 0,
                    "summary": "Performance Metrics of Fitbit.Concentration Application Tested from this PR\\n---------------------------------------------------------------\\n> APP SIZE: 1MB  :white_check_mark:\\n> FIRST LAUNCH AFTER INSTALL - DURATION: 2058ms  :x:\\n> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.43MB  :white_check_mark:\\n---------------------------------------------------------------\\n> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 2142ms  :x: | MEMORY USAGE: 5.32MB  :white_check_mark:\\n> DEVICE: iPhone 8 | LAUNCH TYPE: COLD | DURATION: 2936ms  :x: | MEMORY USAGE: 5.42MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: WARM | DURATION: 2084ms  :x: | MEMORY USAGE: 5.37MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: COLD | DURATION: 3390ms  :x: | MEMORY USAGE: 5.45MB  :white_check_mark:\\n----------------------------------------------------\\n"
                },
                {
                    "id": 3,
                    "app_bundle_id": "Fitbit.Concentration",
                    "pr_id": 0,
                    "summary": "Performance Metrics of Fitbit.Concentration Application Tested from this PR\\n---------------------------------------------------------------\\n> APP SIZE: 1MB  :white_check_mark:\\n> FIRST LAUNCH AFTER INSTALL - DURATION: 2058ms  :x:\\n> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.43MB  :white_check_mark:\\n---------------------------------------------------------------\\n> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 2142ms  :x: | MEMORY USAGE: 5.32MB  :white_check_mark:\\n> DEVICE: iPhone 8 | LAUNCH TYPE: COLD | DURATION: 2936ms  :x: | MEMORY USAGE: 5.42MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: WARM | DURATION: 2084ms  :x: | MEMORY USAGE: 5.37MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: COLD | DURATION: 3390ms  :x: | MEMORY USAGE: 5.45MB  :white_check_mark:\\n----------------------------------------------------\\n"
                }
            ]
        }
  
### GET_JOB_WITH_ID  
    Path: localhost:3002/api/v1/jobs/id/:ID
    Type: GET
    Authorized roles: ADMIN, MANAGER, USER
    Parameters: ID
    Returns:
        {
            "response": {
                "id": 1,
                "app_bundle_id": "Fitbit.Concentration",
                "pr_id": 0,
                "summary": "Performance Metrics of Fitbit.Concentration Application Tested from this PR\\n---------------------------------------------------------------\\n> APP SIZE: 1MB  :white_check_mark:\\n> FIRST LAUNCH AFTER INSTALL - DURATION: 2058ms  :x:\\n> FIRST LAUNCH AFTER INSTALL - MEMORY USAGE: 5.43MB  :white_check_mark:\\n---------------------------------------------------------------\\n> DEVICE: iPhone 8 | LAUNCH TYPE: WARM | DURATION: 2142ms  :x: | MEMORY USAGE: 5.32MB  :white_check_mark:\\n> DEVICE: iPhone 8 | LAUNCH TYPE: COLD | DURATION: 2936ms  :x: | MEMORY USAGE: 5.42MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: WARM | DURATION: 2084ms  :x: | MEMORY USAGE: 5.37MB  :white_check_mark:\\n> DEVICE: iPhone 11 | LAUNCH TYPE: COLD | DURATION: 3390ms  :x: | MEMORY USAGE: 5.45MB  :white_check_mark:\\n----------------------------------------------------\\n"
            }
        }
    
### DELETE_JOB_WITH_ID
    Path: localhost:3002/api/v1/jobs/id/:ID
    Type: DELETE
    Authorized roles: ADMIN, MANAGER
    Parameters: ID

### GET_PERFORMANCE_METRICS_FOR_APP    
    Path: localhost:3002/api/v1/metrics/:APP_BUNDLE_ID
    Type: GET
    Authorized roles: ADMIN, MANAGER, USER
    Parameters: APP_BUNDLE_ID
    Body:
        {
            "device": "iPhone 11",
            "launch_type": "WARM",
            "limit": 2
        }
    Returns:
        {
            "response": {
                "launch_duration_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": 250
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": 350
                    }
                ],
                "launch_memory_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": 5
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": 5
                    }
                ],
                "install_duration_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": 350
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": 260
                    }
                ],
                "install_memory_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": 5
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": 6
                    }
                ],
                "app_size_data": [
                    {
                        "today_date": "2021-06-03T00:00:00.000Z",
                        "avg": "10.0000000000000000"
                    },
                    {
                        "today_date": "2021-06-02T00:00:00.000Z",
                        "avg": "10.0000000000000000"
                    }
                ]
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
