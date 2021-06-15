import axios from 'axios';

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PerfMetric from "../Components/PerfMetric";
import '../graphstyle.css';
import {XYPlot, LineSeries, VerticalBarSeries, MarkSeries } from 'react-vis';

import Unauthorized from '../Components/Unauthorized';

export default function UserAnalyticsScreen(props){

    const workspaceId = props.match.params.workspaceId;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [launch_duration_data, setlaunch_duration_data] = useState([]);
    const [launch_memory_data, setlaunch_memory_data] = useState([]);
    const [install_duration_data, setinstall_duration_data] = useState([]);
    const [install_memory_data, setinstall_memory_data] = useState([]);
    const [app_size_data, setapp_size_data] = useState([]);

    const [registersData, setRegistersData] = useState([]);
    const [loginsData, setLoginsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);

    const [data, setData] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(token && launch_duration_data.length === 0) {
            axios.get(
                `http://localhost:3002/api/v1/metrics/${workspaceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(
                response => {
                    console.log(response.data)
                    localStorage.setItem("trends", JSON.stringify(response.data.response))
                    localStorage.setItem("launch_duration_data", JSON.stringify(response.data.response.launch_duration_data))
                    localStorage.setItem("launch_memory_data", JSON.stringify(response.data.response.launch_memory_data))
                    localStorage.setItem("install_duration_data", JSON.stringify(response.data.response.install_duration_data))
                    localStorage.setItem("install_memory_data", JSON.stringify(response.data.response.install_memory_data))
                    localStorage.setItem("app_size_data", JSON.stringify(response.data.response.app_size_data))

                    setErrorMessage('Retrieve Successful!')

                    var data = [];
                    for (var i = 0; i < response.data.response.launch_duration_data.length; i++) {
                        data.push({x: i, y: response.data.response.launch_duration_data[i].avg});
                    }
                    localStorage.setItem("launch_duration_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.launch_memory_data.length; i++) {
                        data.push({x: i, y: response.data.response.launch_memory_data[i].avg});
                    }
                    localStorage.setItem("launch_memory_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.install_duration_data.length; i++) {
                        data.push({x: i, y: response.data.response.install_duration_data[i].avg});
                    }
                    localStorage.setItem("install_duration_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.install_memory_data.length; i++) {
                        data.push({x: i, y: response.data.response.install_memory_data[i].avg});
                    }
                    localStorage.setItem("install_memory_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.app_size_data.length; i++) {
                        data.push({x: i, y: response.data.response.app_size_data[i].avg});
                    }
                    localStorage.setItem("app_size_data", JSON.stringify(data))
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                    } else {
                        setErrorMessage('Error retrieving performance trends!')
                    }
                },
            );
            setlaunch_duration_data(JSON.parse(localStorage.getItem("launch_duration_data")));
            setlaunch_memory_data(JSON.parse(localStorage.getItem("launch_memory_data")));
            setinstall_duration_data(JSON.parse(localStorage.getItem("install_duration_data")));
            setinstall_memory_data(JSON.parse(localStorage.getItem("install_memory_data")));
            setapp_size_data(JSON.parse(localStorage.getItem("app_size_data")));

        } else {
            setErrorMessage('You are not authorized for this action!')
        }
    },[launch_duration_data, token]);

    return(
        token != null ? (
            launch_duration_data.length > 0 ? (
                <div>
                    <h1> Performance trends for application {workspaceId} </h1>
                    <div className="graph">
                        <h2> Launch duration </h2>
                        <XYPlot height={300} width={300}>
                            <LineSeries data={launch_duration_data} color="red" />
                        </XYPlot>

                        <h2> Memory usage </h2>
                        <XYPlot height={300} width={300}>
                            <LineSeries data={launch_memory_data} color="red" />
                        </XYPlot>

                        <h2> After install launch duration </h2>
                        <XYPlot height={300} width={300}>
                            <LineSeries data={install_duration_data} color="red" />
                        </XYPlot>

                        <h2> After install memory usage </h2>
                        <XYPlot height={300} width={300}>
                            <LineSeries data={install_memory_data} color="red" />
                        </XYPlot>

                        <h2> Application size </h2>
                        <XYPlot height={300} width={300}>
                            <LineSeries data={app_size_data} color="red" />
                        </XYPlot>
                    </div>
                </div>
            ) : (
                <div>
                    No performance data found!
                    <br/>
                    <div>
                        {errorMessage && (<p className="error"> {errorMessage} </p>)}
                    </div>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}