import axios from 'axios';

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function RegisterScreen() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:3003/api/v1/users/register',
            {
                "username": username,
                "password": password
            }
        )
        .then(
            response => {
                console.log(response.data)
                console.log(response.status)
                setErrorMessage('Register Successful!')
                let path = "/login"
                history.push(path)
            },
        )
        .catch(
            error => {
                console.error(error)
                console.log(error.response.status)
                setErrorMessage('Username already in use! Try another username!')
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
                        <h1>Create account</h1>
                    </div>
                    <div>
                        <label htmlFor="username" className="labels">
                            Username
                        </label>
                        <br />
                        <input type="text" id="username" required
                            onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <br />
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
                    <br />
                    <div>
                        <label />
                        <button className="primary" type="submit">Register</button>
                    </div>
                </form>
            <div className="TODO">
                    Already have an account? {' '}
                    <Link to={"/login"}>Login</Link>
                </div>
            </main>
        </div>
    )
}