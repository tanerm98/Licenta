import axios from 'axios';

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserMetric from "../Components/UserMetric";
import '../graphstyle.css';
import {XYPlot, LineSeries, VerticalBarSeries, MarkSeries } from 'react-vis';

export default function UserAnalyticsScreen(){

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [analytics, setAnalytics] = useState([]);
    const [registers, setRegisters] = useState([]);
    const [logins, setLogins] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [registersData, setRegistersData] = useState([]);
    const [loginsData, setLoginsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);

    const [data, setData] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && analytics.length === 0) {
            axios.get(
                'http://localhost:3002/api/v1/users/analytics/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    localStorage.setItem("analytics", JSON.stringify(response.data.response))
                    localStorage.setItem("registers", JSON.stringify(response.data.response.registers_data))
                    localStorage.setItem("logins", JSON.stringify(response.data.response.logins_data))
                    localStorage.setItem("jobs", JSON.stringify(response.data.response.jobs_data))
                    setErrorMessage('Retrieve Successful!')

                    var data = [];
                    for (var i = 0; i < response.data.response.registers_data.length; i++) {
                        data.push({x: i, y: response.data.response.registers_data[i].sum});
                    }
                    localStorage.setItem("registersData", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.logins_data.length; i++) {
                        data.push({x: i, y: response.data.response.logins_data[i].sum});
                    }
                    localStorage.setItem("loginsData", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.jobs_data.length; i++) {
                        data.push({x: i, y: response.data.response.jobs_data[i].sum});
                    }
                    localStorage.setItem("jobsData", JSON.stringify(data))
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Error retrieving analytics!')
                    }
                },
            );
            setRegistersData(JSON.parse(localStorage.getItem("registersData")));
            setLoginsData(JSON.parse(localStorage.getItem("loginsData")));
            setJobsData(JSON.parse(localStorage.getItem("jobsData")));

        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[analytics, token]);

    return(
        registersData.length > 0 ? (
            <div>
                <h1> User activity analytics </h1>
                <div className="graph">
                    <h2> Users registered per day </h2>
                    <XYPlot height={300} width={300}>
                        <VerticalBarSeries data={registersData} color="red" />
                    </XYPlot>

                    <h2> Users logged in per day </h2>
                    <XYPlot height={300} width={300}>
                        <VerticalBarSeries data={loginsData} color="blue" />
                    </XYPlot>

                    <h2> Jobs run by users per day </h2>
                    <XYPlot height={300} width={300}>
                        <VerticalBarSeries data={jobsData} color="green" />
                    </XYPlot>
                </div>
            </div>
        ) : (
            <div>
                No user analytics found!
                <br/>
                <div>
                    {errorMessage && (<p className="error"> {errorMessage} </p>)}
                </div>
            </div>
        )
    )
}