import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Workspace from "../Components/Workspace";
import Unauthorized from '../Components/Unauthorized';
import { Table } from 'react-bootstrap';

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
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                          <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                            View Workspaces for All Applications. Create New Workspaces
                          </h1>
                          <div class="col-lg-12">
                            <br/><br/><br/><br/>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>BUNDLE ID</th>
                                        <th>DESCRIPTION</th>
                                        <th>REPOSITORY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        workspaces.map(
                                            workspace => (
                                                <Workspace key={workspace.app_bundle_id} workspace={workspace}></Workspace>
                                            )
                                        )
                                    }
                                </tbody>
                            </Table>
                            <br/><br/><br/><br/>
                          </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-secondary btn-lg px-4" onClick={createWorkspace}> New Workspace </button>
                    </div>
                    <br/><br/><br/><br/>
                </div>
            ) : (
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                          <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                            View Workspaces for All Applications. Create New Workspaces
                          </h1>
                          <div class="col-lg-12">
                            <p class="lead">
                                <h2>No workspaces found</h2>
                            </p>
                          </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-secondary btn-lg px-4" onClick={createWorkspace}> New Workspace </button>
                    </div>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}