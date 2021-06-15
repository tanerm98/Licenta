import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Workspace from "../Components/Workspace";
import Unauthorized from '../Components/Unauthorized';

export default function WorkspacesScreen(){

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [workspaces, setWorkspaces] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && workspaces.length === 0) {
            axios.get(
                'http://localhost:3002/api/v1/workspaces/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    localStorage.setItem("workspaces", JSON.stringify(response.data.response))
                    setErrorMessage('Retrieve Successful!')
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Error retrieving workspaces!')
                    }
                },
            );
            setWorkspaces(JSON.parse(localStorage.getItem("workspaces")));
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[workspaces, token]);

    const createWorkspace = (e, workspaceId) => {
        e.preventDefault();
        let path = "/workspacecreate"
        history.push(path)
    };

    const deleteWorkspace = (workspaceId, e) => {
        e.preventDefault();
        axios.delete(
            `http://localhost:3002/api/v1/workspaces/${workspaceId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(
            response => {
                console.log(response.data)
                console.log(response.status)
                localStorage.setItem("token", response.data.response.token)
                setErrorMessage('Delete Successful!')
            },
        )
        .catch(
            error => {
                console.error(error)
            },
        );
    };

    return(
        token != null ? (
            workspaces.length > 0 ? (
                <div>
                    <main>
                        <div className="row center">
                            {
                                workspaces.map(
                                    workspace => (
                                        <div>
                                            <Workspace key={workspace.app_bundle_id} workspace={workspace}></Workspace>
                                            <button onClick={(e) => deleteWorkspace(workspace.app_bundle_id, e)}> Delete this workspace </button>
                                            <br/><br/><br/><br/>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div>
                            <button className="primary" onClick={createWorkspace}> Create new workspace </button>
                        </div>
                        <div>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                        </div>
                    </main>
                </div>
            ) : (
                <div>
                    No workspaces found. :D
                    <br/>
                    <button className="primary" onClick={createWorkspace}> Create new workspace </button>
                    <br/>
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