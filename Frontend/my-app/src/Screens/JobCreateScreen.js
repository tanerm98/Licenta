import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Unauthorized from '../Components/Unauthorized';

import { Form, Col } from 'react-bootstrap';

export default function JobCreateScreen(props) {

    const workspaceId = props.match.params.workspaceId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [fileId, setFileId] = useState('1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk');
    const [device, setDevice] = useState('');
    const [launchType, setLaunchType] = useState('');
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
            <div class="page2">
                <div class="wrapper fadeInDown">
                  <div id="formContent3">

                    <div class="fadeIn first">
                        <br/>
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/18-education/exam-test.png" id="icon" alt="User Icon" />
                    </div>
                    <br/>
                    <form onSubmit={submitHandler}>
                      <div className="header-log">
                        <h1> Run New Job </h1>
                        <h4><Link to={`/jobs/${workspaceId}`}>{workspaceId}</Link></h4>
                        <br/><br/>
                      </div>
                      <div class="form-group">
                        <input type="text" class="fadeIn second" id="fileId" placeholder="Google Drive APP File ID" required onChange={e => setFileId(e.target.value)}></input>
                      </div>

                      <Form.Row>
                          <Form.Group as={Col} controlId="device" class="fadeIn second">
                            <Form.Label class="fadeIn second label">Tested Devices</Form.Label>
                            <Form.Control as="select" onChange={e => setDevice(e.target.value)}>
                              <option>All</option>
                              <option>iPhone 8</option>
                              <option>iPhone 11</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group as={Col} controlId="launchType" class="fadeIn second">
                            <Form.Label class="fadeIn second">Tested launch types</Form.Label>
                            <Form.Control as="select" onChange={e => setLaunchType(e.target.value)}>
                              <option>All</option>
                              <option>WARM</option>
                              <option>COLD</option>
                            </Form.Control>
                          </Form.Group>
                      </Form.Row>

                      <div class="form-group">
                        <input type="number" class="fadeIn second" id="launchNr" placeholder="Number of runs" onChange={e => setLaunchNr(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="number" class="fadeIn second" id="durationLimit" placeholder="Maximum launch duration threshold (ms)" onChange={e => setDurationLimit(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="number" class="fadeIn second" id="memoryLimit" placeholder="Maximum RAM memory usage threshold (MB)" onChange={e => setMemoryLimit(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="number" class="fadeIn second" id="sizeLimit" placeholder="Maximum APP size threshold (MB)" onChange={e => setSizeLimit(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="text" class="fadeIn second" id="repoGithubToken" placeholder="Github token" onChange={e => setRepoGithubToken(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="text" class="fadeIn second" id="repoOwner" placeholder="Github repository owner" onChange={e => setRepoOwner(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="text" class="fadeIn second" id="repoName" placeholder="Github repository name" onChange={e => setRepoName(e.target.value)}></input>
                      </div>

                      <div class="form-group">
                        <input type="number" class="fadeIn second" id="prNumber" placeholder="Pull-Request ID - 0 for main branch" onChange={e => setPrNumber(e.target.value)}></input>
                      </div>

                      <br/><br/><br/>
                      <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                      </div>
                      <input type="submit" class="fadeIn fourth" value="Create"></input>
                    </form>



                  </div>
                </div>
            </div>
        ) : (
            <Unauthorized/>
        )
    )
}

//<div>
//    <div className="TODO">
//        <h3><Link to={`/jobs/${workspaceId}`}> Back to {workspaceId} Jobs </Link></h3>
//        <br/>
//    </div>
//    <main>
//        <form className="form" onSubmit={submitHandler}>
//            <div className="header-log">
//                <h1>Run performance testing job</h1>
//            </div>
//            <div>
//                <label htmlFor="fileId" className="labels">
//                    Google Drive APP File ID
//                </label>
//                <br />
//                <input type="text" id="fileId" required
//                    onChange={e => setFileId(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="device" className="labels">
//                    Device to run the tests on: [iPhone 8, iPhone 11]
//                </label>
//                <br />
//                <input type="text" id="device" value="iPhone 11"
//                    onChange={e => setDevice(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="launchType" className="labels">
//                    Launch type to test: [WARM, COLD]
//                </label>
//                <br />
//                <input type="text" id="launchType" value="WARM"
//                    onChange={e => setLaunchType(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="launchNr" className="labels">
//                    Number of executed launches for computing the average result
//                </label>
//                <br />
//                <input type="text" id="launchNr" value="1"
//                    onChange={e => setLaunchNr(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="durationLimit" className="labels">
//                    Maximum launch duration threshold
//                </label>
//                <br />
//                <input type="text" id="durationLimit" value="5000"
//                    onChange={e => setDurationLimit(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="memoryLimit" className="labels">
//                    Maximum RAM memory usage threshold
//                </label>
//                <br />
//                <input type="text" id="memoryLimit" value="50"
//                    onChange={e => setMemoryLimit(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="sizeLimit" className="labels">
//                    Maximum APP size threshold
//                </label>
//                <br />
//                <input type="text" id="sizeLimit" value="100"
//                    onChange={e => setSizeLimit(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="repoGithubToken" className="labels">
//                    Github token for access to the repository where the APP source code is
//                </label>
//                <br />
//                <input type="text" id="repoGithubToken" value=""
//                    onChange={e => setRepoGithubToken(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="repoOwner" className="labels">
//                    Github repository owner
//                </label>
//                <br />
//                <input type="text" id="repoOwner" value=""
//                    onChange={e => setRepoOwner(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="repoName" className="labels">
//                    Github repository name
//                </label>
//                <br />
//                <input type="text" id="repoName" value=""
//                    onChange={e => setRepoName(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                <label htmlFor="prNumber" className="labels">
//                    ID of Pull-Request of the tested APP source code - 0 for main branch
//                </label>
//                <br />
//                <input type="text" id="prNumber" value=""
//                    onChange={e => setPrNumber(e.target.value)}></input>
//            </div>
//            <br />
//            <div>
//                {errorMessage && (<p className="error"> {errorMessage} </p>)}
//            </div>
//            <br />
//            <div>
//                <label />
//                <button className="primary" type="submit">Run</button>
//            </div>
//        </form>
//        <div>
//            <br/><br/><br/><br/>
//            {errorMessage && (<p className="error"> {errorMessage} </p>)}
//        </div>
//    </main>
//</div>