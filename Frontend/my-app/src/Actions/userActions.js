import axios from 'axios';

export const login = (username, password) => {
    var status
    axios.post(
        'http://localhost:3003/api/v1/users/login',
        {
            "username": username,
            "password": password
        }
    )
    .then(
        response => {
            localStorage.setItem("token", response.data.response.token)
            console.log(response.status)
            status = response.status
        }
    )
    .catch(
        error => {
            console.error(error)
            console.log(error.response.status)
            status = error.response.status
        }
    );
    return status;
};

export const register = (username, password) => {
    var status
    axios.post(
        'http://localhost:3003/api/v1/users/register',
        {
            "username": username,
            "password": password
        }
    )
    .then(
        response => {
            localStorage.setItem("token", response.data.response.token)
            console.log(response.status)
            status = response.status
        },
    )
    .catch(
        error => {
            console.error(error)
            console.log(error.response.status)
            status = error.response.status
        }
    );
    return status;
};