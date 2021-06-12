import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Jobs from "../Components/Jobs";

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
            <div className="TODO">
                <h3><Link to={`/workspace/${workspaceId}`}> {workspaceId} </Link></h3>
                Loading or no jobs found. Please <button className="primary" onClick={retry}>RETRY</button>...
                <br/><br/><br/>
                <button className="primary" onClick={runJob}> Run new job </button>
                <br/><br/><br/>
                <div>
                    {errorMessage && (<p className="error"> {errorMessage} </p>)}
                </div>
            </div>
        )
    )
}