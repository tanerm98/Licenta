import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Unauthorized from '../Components/Unauthorized';

import { Form } from 'react-bootstrap';

export default function WorkspaceCreateScreen() {

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [appBundleId, setAppBundleId] = useState('');
    const [description, setDescription] = useState('');
    const [repoLink, setRepoLink] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = (e) => {
        const token = localStorage.getItem("token");
        if(token) {
            console.log(token);
            e.preventDefault();
            axios.post(
                'http://localhost:3002/api/v1/workspaces/create',
                {
                    "app_bundle_id": appBundleId,
                    "description": description,
                    "repository_link": repoLink
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    console.log(response.status)
                    setErrorMessage('Workspace Creation Successful!')
                    let path = `/workspaces`
                    history.push(path)
                },
            )
            .catch(
                error => {
                    console.error(error)
                    console.log(error.response.status)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Workspace for this application already created!')
                    }
                },
            );
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    };

    return(
        token != null ? (
            <div class="page2">
                <div class="wrapper fadeInDown">
                  <div id="formContent">

                    <div class="fadeIn first">
                        <br/>
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/project-management-34-887151.png" id="icon" alt="User Icon" />
                    </div>
                    <br/>
                    <form onSubmit={submitHandler}>
                      <div className="header-log">
                        <h1> Create New Workspace </h1>
                        <br/><br/>
                      </div>
                      <input type="text" class="fadeIn second" id="appBundleId" placeholder="App Bundle ID" required onChange={e => setAppBundleId(e.target.value)}></input>
                      <input type="textarea" class="fadeIn second" id="appBundleId" placeholder="Short Description" required onChange={e => setDescription(e.target.value)}></input>
                      <input type="text" class="fadeIn second" id="appBundleId" placeholder="Repository Link" required onChange={e => setRepoLink(e.target.value)}></input>
                      <br/><br/><br/>
                      <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                      </div>
                      <input type="submit" class="fadeIn fourth" value="Create"></input>
                    </form>



                  </div>
                </div>
            </div>
        ) : (
            <Unauthorized/>
        )
    )
}
