import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Workspace from "../Components/Workspace";

export default function WorkspaceScreen(props){

    const workspaceId = props.match.params.workspaceId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [workspace, setWorkspace] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && workspace.length === 0) {
            axios.get(
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
                    localStorage.setItem("workspace", JSON.stringify(response.data.response))
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
            setWorkspace(JSON.parse(localStorage.getItem("workspace")));
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[workspace, token]);

    return(
        workspace != null && workspace.app_bundle_id == workspaceId ? (
            <div>
                <main>
                    <div className="row center">
                        <div>
                            <Workspace key={workspace.app_bundle_id} workspace={workspace}></Workspace>
                            <h3><Link to={`/jobs/${workspace.app_bundle_id}`}> Jobs </Link></h3>
                            <h3><Link to={`/trends/${workspace.app_bundle_id}`}>Performance Graphs</Link></h3>
                            <br/><br/>
                        </div>
                    </div>
                </main>
                <div>
                    {errorMessage && (<p className="error"> {errorMessage} </p>)}
                </div>
            </div>
        ) : (
            <div>
                Loading... Please retry!
                {errorMessage && (<p className="error"> {errorMessage} </p>)}
            </div>
        )
    )
}