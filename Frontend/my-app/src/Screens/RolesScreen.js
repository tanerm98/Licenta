import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function JobCreateScreen(props) {

    const userId = props.match.params.userId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [roleId, setRoleId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = (e) => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token);
            e.preventDefault();
            axios.put(
                `http://localhost:3003/api/v1/users/${userId}/role/${roleId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    console.log(response.status)
                    setErrorMessage('Role Set Successful!')
                },
            )
            .catch(
                error => {
                    console.error(error)
                    console.log(error.response.status)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Role setting failed! Try again later!')
                    }
                },
            );
            let path = `/users`;
            history.push(path);
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    };

    return(
        <div>
            <div className="TODO">
                <h3><Link to={`/users`}> Back to Users </Link></h3>
                <br/>
            </div>
            <main>
                <form className="form" onSubmit={submitHandler}>
                    <div className="header-log">
                        <h1>Change role for user {userId}</h1>
                    </div>
                    <div>
                        <label htmlFor="roleId" className="labels">
                            Role ID (1 - ADMIN, 2 - MANAGER, 3 - GUEST)
                        </label>
                        <br />
                        <input type="text" id="roleId" required
                            onChange={e => setRoleId(e.target.value)}></input>
                    </div>
                    <div>
                        <label />
                        <button className="primary" type="submit">Set role</button>
                    </div>
                </form>
                <div>
                    <br/><br/><br/><br/>
                    {errorMessage && (<p className="error"> {errorMessage} </p>)}
                </div>
            </main>
        </div>
    )
}