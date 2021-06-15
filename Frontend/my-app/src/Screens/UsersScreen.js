import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import User from "../Components/User";
import Unauthorized from '../Components/Unauthorized';

import { Table } from 'react-bootstrap';

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
        token != null ? (
            users.length > 0 ? (
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                        View Registered Users and Change Account Roles (ADMIN only)
                      </h1>
                      <div class="col-lg-12">
                        <br/>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USERNAME</th>
                                    <th>ROLE</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(
                                    user => (
                                        <User key={user.id} user={user}></User>
                                    )
                                )
                            }
                            </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
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