import axios from 'axios';

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PerfMetric from "../Components/PerfMetric";

import { VscLoading } from 'react-icons/vsc';

import '../graphstyle.css';
import {XYPlot, LineSeries, VerticalBarSeries, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

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
                        data.push({x: i + 1, y: response.data.response.launch_duration_data[i].avg});
                    }
                    localStorage.setItem("launch_duration_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.launch_memory_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.launch_memory_data[i].avg});
                    }
                    localStorage.setItem("launch_memory_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.install_duration_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.install_duration_data[i].avg});
                    }
                    localStorage.setItem("install_duration_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.install_memory_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.install_memory_data[i].avg});
                    }
                    localStorage.setItem("install_memory_data", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.app_size_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.app_size_data[i].avg});
                    }
                    localStorage.setItem("app_size_data", JSON.stringify(data))
                },
            )
            .catch(
                error => {
                    setErrorMessage('Error retrieving performance trends!')
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

    const retry = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return(
        token != null ? (
            launch_duration_data.length > 0 ? (
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                            <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                              Performance Trends for <Link to={`/workspace/${workspaceId}`}>{workspaceId}</Link> Application
                            </h1>
                            <div class="col-lg-12">
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>LAUNCH DURATION (milliseconds) - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="LAUNCH DURATION (milliseconds)" />
                                        <LineSeries
                                            data={launch_duration_data}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>LAUNCH MEMORY USAGE (megabytes) - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="LAUNCH MEMORY USAGE (megabytes)" />
                                        <LineSeries
                                            data={launch_memory_data}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>INSTALL LAUNCH DURATION (milliseconds) - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="INSTALL LAUNCH DURATION (milliseconds)" />
                                        <LineSeries
                                            data={install_duration_data}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>INSTALL MEMORY USAGE (megabytes) - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="INSTALL MEMORY USAGE (megabytes)" />
                                        <LineSeries
                                            data={install_memory_data}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>APP SIZE (megabytes) - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="APP SIZE (milliseconds)" />
                                        <LineSeries
                                            data={app_size_data}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="page">
                  <div class="d-flex justify-content-center">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <div class="col-lg-12 d-flex justify-content-center">
                        <p class="lead">
                            <h2>Loading or no data found for <Link to={`/workspace/${workspaceId}`}> {workspaceId} </Link> application.</h2>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                      <button class="btn btn-danger btn-lg px-4" onClick={retry}> <VscLoading/> Loading... RETRY </button>
                  </div>
                  <br/>
                </div>
            )
        ) : (
            <Unauthorized/>
        )
    )
}