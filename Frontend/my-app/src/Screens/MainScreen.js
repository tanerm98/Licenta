import axios from 'axios';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

export default function LoginScreen() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return(
        <div>
            <main>
                <div className="container-fluid">
                    <h1>iOS Application Performance Metrics Monitor</h1>
                    <p>This web application is used for measuring the performance metrics of iOS applications</p>
                    <h2>Measured metrics:</h2>
                    <ul>
                      <li>Application size (in MB) - size of .APP file that is installed on the iPhone</li>
                      <li>Launch time - duration from open request to fully loaded main screen</li>
                      <li>Memory usage (in MB) - RAM memory used at app launch</li>
                    </ul>
                    <h2>Measured scenarios:</h2>
                    <ul>
                      <li>After installation - first app launch after installation is measured separately</li>
                      <li>Warm launch - application was launched previously</li>
                      <li>Cold launch - first launch after device reboot</li>
                    </ul>
                    <h2>How this app works:</h2>
                    <ul>
                      <li>The APP is downloaded fro Google Drive</li>
                      <li>Size of application is computed</li>
                      <li>iOS simulators are factory reset for a clean state</li>
                      <li>The application is installed on the device</li>
                      <li>A number of repeated launches is executed</li>
                      <li>iOS logs are downloaded from the device</li>
                      <li>Launch time is computed from start and exit logs timestamps</li>
                      <li>Memory usage is computed for the PID of the launched application</li>
                      <li>The average values are calculated and validated with the baselines</li>
                      <li>Test summary is posted on the provided GitHub Pull-Request where the iOS app source code is</li>
                      <li>Metrics are stored in a database, from where performance trends graphics can be visualized</li>
                    </ul>
                    <br/>
                </div>
                <div className="TODO">
                    Already a member? {' '}
                    <Link to={"/login"}>Login</Link>
                </div>
                <div className="TODO">
                    Don't have an account? {' '}
                    <Link to={"/register"}>Register</Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}
