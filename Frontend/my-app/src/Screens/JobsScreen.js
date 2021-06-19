import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Jobs from "../Components/Jobs";
import Unauthorized from '../Components/Unauthorized';

import { VscLoading } from 'react-icons/vsc';
import { Table } from 'react-bootstrap';

export default function JobsScreen(props){

    const workspaceId = props.match.params.workspaceId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [jobs, setJobs] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && jobs.length === 0) {
            axios.get(
                `http://localhost:3002/api/v1/jobs/bundle/${workspaceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    localStorage.setItem("jobs", JSON.stringify(response.data.response))
                    setErrorMessage('Retrieve Successful!')
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                    setErrorMessage('Error retrieving jobs!')
                    }
                },
            );
            setJobs(JSON.parse(localStorage.getItem("jobs")));
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[setJobs, token]);

    const runJob = (e) => {
        e.preventDefault();
        let path = `/jobcreate/${workspaceId}`
        history.push(path)
    };

    const retry = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return(
        token != null ? (
            jobs.length > 0 ? (
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                          <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                            View Jobs for Application <Link to={`/workspace/${workspaceId}`}>{workspaceId}</Link>. Run New Tests
                          </h1>
                          <div class="col-lg-12">
                            <br/><br/><br/><br/>
                            <Table striped bordered hover>
                                <thead>
                                    <tr class="text-center">
                                        <th>ID</th>
                                        <th>PR</th>
                                        <th>SUMMARY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jobs.map(
                                            job => (
                                                <Jobs key={job.id} job={job}></Jobs>
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
                        <button class="btn btn-outline-secondary btn-lg px-4" onClick={runJob}> New Job </button>
                    </div>
                    <br/><br/><br/><br/>
                </div>
            ) : (
                <div class="page">
                  <div class="d-flex justify-content-center">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <div class="col-lg-12 d-flex justify-content-center">
                        <p class="lead">
                            <h2>Loading or no jobs found for <Link to={`/workspace/${workspaceId}`}> {workspaceId} </Link> application.</h2>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                      <button class="btn btn-danger btn-lg px-4" onClick={retry}> <VscLoading/> Loading... RETRY </button>
                  </div>
                  <br/>
                  <div class="d-flex justify-content-center">
                      <button class="btn btn-outline-secondary btn-lg px-4" onClick={runJob}> New job </button>
                  </div>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}