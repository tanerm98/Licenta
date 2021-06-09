import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
        <div>
            <main>
                <form className="form" onSubmit={submitHandler}>
                    <div className="header-log">
                        <h1>Create workspace</h1>
                    </div>
                    <div>
                        <label htmlFor="appBundleId" className="labels">
                            iOS Application Bundle ID
                        </label>
                        <br />
                        <input type="text" id="appBundleId" required
                            onChange={e => setAppBundleId(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="description" className="labels">
                            Description
                        </label>
                        <br />
                        <input type="text" id="description" required
                            onChange={e => setDescription(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="repoLink" className="labels">
                            Repository Link
                        </label>
                        <br />
                        <input type="text" id="repoLink" required
                            onChange={e => setRepoLink(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                    </div>
                    <br />
                    <div>
                        <label />
                        <button className="primary" type="submit">Create</button>
                    </div>
                </form>
            </main>
        </div>
    )
}