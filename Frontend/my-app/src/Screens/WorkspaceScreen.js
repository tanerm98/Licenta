import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Workspace from "../Components/Workspace";
import Unauthorized from '../Components/Unauthorized';

import { VscLoading } from 'react-icons/vsc';

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

    const retry = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return(
        token != null ? (
            workspace != null && workspace.app_bundle_id == workspaceId ? (
                <div class="page">
                  <div class="container col-xxl-8 px-1 py-1">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                        Workspace Dashboard: <Link to={`/workspace/${workspace.app_bundle_id}`}> {workspace.app_bundle_id} </Link> Application
                      </h1>
                      <div class="col-lg-12">
                        <br/><br/>
                        <p class="lead">
                            <h2>Description</h2>
                                <ul>
                                  <li>{workspace.description}</li>
                                </ul>
                            <br/>
                            <h2>REPOSITORY</h2>
                                <ul>
                                  <li><a target="_blank" href={`https://${workspace.repository_link}`}> {workspace.repository_link} </a></li>
                                </ul>
                            <br/>
                            <h2><Link to={`/jobs/${workspace.app_bundle_id}`}> Jobs </Link></h2>
                                <ul>
                                  <li>View tests run for this application;</li>
                                  <li>Visualize collected metrics for each test.</li>
                                </ul>
                            <br/>
                            <h2><Link to={`/trends/${workspace.app_bundle_id}`}>Performance Graphs</Link></h2>
                                <ul>
                                  Visualize performance trends for the following metrics:
                                  <li>Launch Duration;</li>
                                  <li>Memory Usage;</li>
                                  <li>After Install Launch Duration;</li>
                                  <li>After Install Memory Usage;</li>
                                  <li>Application Size.</li>
                                </ul>
                            <br/>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <div class="page">
                  <div class="d-flex justify-content-center">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                        Workspace Dashboard
                      </h1>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                      <button class="btn btn-danger btn-lg px-4" onClick={retry}> <VscLoading/> Loading... RETRY </button>
                  </div>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}