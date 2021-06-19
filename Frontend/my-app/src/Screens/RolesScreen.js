import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Unauthorized from '../Components/Unauthorized';

import { Form, Col } from 'react-bootstrap';

export default function JobCreateScreen(props) {

    const userId = props.match.params.userId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [roleId, setRoleId] = useState('1');
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
        token != null ? (
            <div class="page2">
                <div class="wrapper fadeInDown">
                  <div id="formContent3">

                    <div class="fadeIn first">
                        <br/>
                        <img src="https://icon-library.com/images/role-icon/role-icon-1.jpg" id="icon" alt="User Icon" />
                    </div>
                    <br/>
                    <form onSubmit={submitHandler}>
                      <div className="header-log">
                        <h1> Change Role for User ID {userId} </h1>
                        <h4><Link to={`/users`}>Users</Link></h4>
                        <br/><br/>
                      </div>

                      <Form.Group as={Col} controlId="device" class="fadeIn second">
                        <Form.Label class="fadeIn second label">Role ID (1 - ADMIN, 2 - MANAGER, 3 - GUEST)</Form.Label>
                        <Form.Control as="select" onChange={e => setRoleId(e.target.value)}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Form.Control>
                      </Form.Group>

                      <br/><br/><br/>
                      <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                      </div>
                      <input type="submit" class="fadeIn fourth" value="Set Role"></input>
                    </form>

                  </div>
                </div>
            </div>
        ) : (
            <Unauthorized/>
        )
    )
}