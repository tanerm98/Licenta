import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import User from "../Components/User";
import Unauthorized from '../Components/Unauthorized';

export default function WorkspacesScreen(){

    const history = useHistory();
    const token = localStorage.getItem("token");
    var authorized = 1;

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && users.length === 0) {
            axios.get(
                'http://localhost:3003/api/v1/users/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    localStorage.setItem("users", JSON.stringify(response.data.response))
                    setErrorMessage('Retrieve Successful!')
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setUsers([])
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Error retrieving users!')
                    }
                },
            );
            setUsers(JSON.parse(localStorage.getItem("users")));
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[users, token]);

    return(
        (token != null && authorized == 1) ? (
            users.length > 0 ? (
                <div>
                    <main>
                        <div className="row center">
                            {
                                users.map(
                                    user => (
                                        <div>
                                            <User key={user.id} user={user}></User>
                                            <br/><br/><br/><br/>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                        </div>
                    </main>
                </div>
            ) : (
                <div>
                    No users found!
                    <br/><br/>
                    <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                    </div>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}