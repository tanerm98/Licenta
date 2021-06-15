import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Jobs from "../Components/Jobs";
import Unauthorized from '../Components/Unauthorized';

import { VscLoading } from 'react-icons/vsc';

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

    const deleteJob = (jobId, e) => {
        e.preventDefault();
        axios.delete(
            `http://localhost:3002/api/v1/jobs/id/${jobId}`,
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
            jobs.length > 0 ? (
                <div>
                    <div className="TODO">
                        <h3><Link to={`/workspace/${workspaceId}`}> Back to {workspaceId} workspace </Link></h3>
                        <br/><br/>
                    </div>
                    <main>
                        <div className="row center">
                            {
                                jobs.map(
                                    job => (
                                        <div>
                                            <Jobs key={job.id} job={job}></Jobs>
                                            <button onClick={(e) => deleteJob(job.id, e)}> Delete this job </button>
                                            <br/><br/><br/><br/>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div>
                            <button className="primary" onClick={runJob}> Run new job </button>
                        </div>
                        <div>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                        </div>
                    </main>
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