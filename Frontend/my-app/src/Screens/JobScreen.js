import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Job from "../Components/Job";

export default function JobScreen(props){

    const jobId = props.match.params.jobId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [job, setJob] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && job.length === 0) {
            axios.get(
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
                    localStorage.setItem("job", JSON.stringify(response.data.response))
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
            setJob(JSON.parse(localStorage.getItem("job")));
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[setJob, token]);

    return(
        job != null && job.id == jobId ? (
            <div>
                <div className="TODO">
                    <h3><Link to={`/jobs/${job.app_bundle_id}`}> Back to {job.app_bundle_id} jobs </Link></h3>
                    <br/><br/>
                </div>
                <main>
                    <div className="row center">
                        <div>
                            <Job key={job.id} job={job}></Job>
                            <br/>
                        </div>
                    </div>

                </main>
            </div>
        ) : (
            <div>
                Loading... Please refresh!
                {errorMessage && (<p className="error"> {errorMessage} </p>)}
            </div>
        )
    )
}