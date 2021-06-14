import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';

import { AiOutlineLogin } from 'react-icons/ai';

import Footer from '../Components/Footer';

export default function LoginScreen() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:3003/api/v1/users/login',
            {
                "username": username,
                "password": password
            }
        )
        .then(
            response => {
                console.log(response.data)
                console.log(response.status)
                localStorage.setItem("token", response.data.response.token)
                setErrorMessage('Login Successful!')
                let path = "/workspaces"
                history.push(path)
            },
        )
        .catch(
            error => {
                console.error(error)
                console.log(error.response.status)
                setErrorMessage('Invalid login credentials!')
            },
        );
    };

    return(
        <div>
            <div class="wrapper fadeInDown">
              <div id="formContent">

                <div class="fadeIn first">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png" id="icon" alt="User Icon" />
                </div>

                <form onSubmit={submitHandler}>
                  <div className="header-log">
                    <h1><AiOutlineLogin/> Sign In</h1>
                  </div>
                  <input type="text" id="login" class="fadeIn second" name="login" placeholder="Username" required onChange={e => setUsername(e.target.value)}></input>
                  <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" required onChange={e => setPassword(e.target.value)}></input>
                  <input type="submit" class="fadeIn fourth" value="Log In"></input>
                </form>

                <div>
                    {errorMessage && (<p className="error"> {errorMessage} </p>)}
                </div>

                <div id="formFooter">
                  Don't have an account? <a class="underlineHover" href="#register">Register</a>
                </div>

              </div>
            </div>
        </div>
    )
}