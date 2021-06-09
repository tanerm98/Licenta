import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

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
            <header>
                <div className="header">
                    <div className="TODO">
                        <h1><Link to={`/`}>iOS Performance Monitor</Link></h1>
                    </div>
                </div>
                <br />
            </header>
            <main>
                <form className="form" onSubmit={submitHandler}>
                    <div className="header-log">
                        <h1>Login</h1>
                    </div>
                    <div>
                        <label htmlFor="username" className="labels">
                            Username
                        </label>
                        <br/>
                        <input id="username" required
                            onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    < br/>
                    <div>
                        <label htmlFor="password" className="labels">
                            Password
                        </label>
                        <br />
                        <input type="password" id="password" required
                            onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">Login</button>
                    </div>
                </form>
                <div className="TODO">
                    Don't have an account? {' '}
                    <Link to={"/register"}>Register</Link>
                </div>
            </main>
        </div>
    )
}