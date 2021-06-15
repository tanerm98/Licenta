import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Unauthorized from '../Components/Unauthorized';

export default function JobCreateScreen(props) {

    const workspaceId = props.match.params.workspaceId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [fileId, setFileId] = useState('1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk');
    const [device, setDevice] = useState('iPhone 11');
    const [launchType, setLaunchType] = useState('WARM');
    const [launchNr, setLaunchNr] = useState('1');
    const [durationLimit, setDurationLimit] = useState('5000');
    const [memoryLimit, setMemoryLimit] = useState('50');
    const [sizeLimit, setSizeLimit] = useState('100');
    const [repoGithubToken, setRepoGithubToken] = useState('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');
    const [repoOwner, setRepoOwner] = useState('tanerm98');
    const [repoName, setRepoName] = useState('Licenta');
    const [prNumber, setPrNumber] = useState('1');

    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler = (e) => {
        const token = localStorage.getItem("token");
        if (token) {
            e.preventDefault();
            axios.post(
                `http://localhost:3002/api/v1/jobs/run/${workspaceId}`,
                {
                    "file_id": fileId,
                    "device": device,
                    "launch_type": launchType,
                    "launch_nr": launchNr,
                    "duration_limit": durationLimit,
                    "memory_limit": memoryLimit,
                    "size_limit": sizeLimit,
                    "repo_github_token": repoGithubToken,
                    "repo_owner": repoOwner,
                    "repo_name": repoName,
                    "pr_number": prNumber
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
                    setErrorMessage('Job Run Scheduling Successful!')
                },
            )
            .catch(
                error => {
                    console.error(error)
                    console.log(error.response.status)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Another job is already running! Try again later!')
                    }
                },
            );
            let path = `/jobs/${workspaceId}`;
            history.push(path);
        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    };

    return(
        token != null ? (
            <div>
                <div className="TODO">
                    <h3><Link to={`/jobs/${workspaceId}`}> Back to {workspaceId} Jobs </Link></h3>
                    <br/>
                </div>
                <main>
                    <form className="form" onSubmit={submitHandler}>
                        <div className="header-log">
                            <h1>Run performance testing job</h1>
                        </div>
                        <div>
                            <label htmlFor="fileId" className="labels">
                                Google Drive APP File ID
                            </label>
                            <br />
                            <input type="text" id="fileId" required
                                onChange={e => setFileId(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="device" className="labels">
                                Device to run the tests on: [iPhone 8, iPhone 11]
                            </label>
                            <br />
                            <input type="text" id="device" value="iPhone 11"
                                onChange={e => setDevice(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="launchType" className="labels">
                                Launch type to test: [WARM, COLD]
                            </label>
                            <br />
                            <input type="text" id="launchType" value="WARM"
                                onChange={e => setLaunchType(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="launchNr" className="labels">
                                Number of executed launches for computing the average result
                            </label>
                            <br />
                            <input type="text" id="launchNr" value="1"
                                onChange={e => setLaunchNr(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="durationLimit" className="labels">
                                Maximum launch duration threshold
                            </label>
                            <br />
                            <input type="text" id="durationLimit" value="5000"
                                onChange={e => setDurationLimit(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="memoryLimit" className="labels">
                                Maximum RAM memory usage threshold
                            </label>
                            <br />
                            <input type="text" id="memoryLimit" value="50"
                                onChange={e => setMemoryLimit(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="sizeLimit" className="labels">
                                Maximum APP size threshold
                            </label>
                            <br />
                            <input type="text" id="sizeLimit" value="100"
                                onChange={e => setSizeLimit(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="repoGithubToken" className="labels">
                                Github token for access to the repository where the APP source code is
                            </label>
                            <br />
                            <input type="text" id="repoGithubToken" value=""
                                onChange={e => setRepoGithubToken(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="repoOwner" className="labels">
                                Github repository owner
                            </label>
                            <br />
                            <input type="text" id="repoOwner" value=""
                                onChange={e => setRepoOwner(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="repoName" className="labels">
                                Github repository name
                            </label>
                            <br />
                            <input type="text" id="repoName" value=""
                                onChange={e => setRepoName(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="prNumber" className="labels">
                                ID of Pull-Request of the tested APP source code - 0 for main branch
                            </label>
                            <br />
                            <input type="text" id="prNumber" value=""
                                onChange={e => setPrNumber(e.target.value)}></input>
                        </div>
                        <br />
                        <div>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                        </div>
                        <br />
                        <div>
                            <label />
                            <button className="primary" type="submit">Run</button>
                        </div>
                    </form>
                    <div>
                        <br/><br/><br/><br/>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                    </div>
                </main>
            </div>
        ) : (
            <Unauthorized/>
        )
    )
}