import axios from 'axios';

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import UserMetric from "../Components/UserMetric";
import Unauthorized from '../Components/Unauthorized';

import { VscLoading } from 'react-icons/vsc';

import '../graphstyle.css';
import {XYPlot, LineSeries, VerticalBarSeries, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

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
                        data.push({x: i + 1, y: response.data.response.registers_data[i].sum});
                    }
                    localStorage.setItem("registersData", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.logins_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.logins_data[i].sum});
                    }
                    localStorage.setItem("loginsData", JSON.stringify(data))

                    var data = [];
                    for (var i = 0; i < response.data.response.jobs_data.length; i++) {
                        data.push({x: i + 1, y: response.data.response.jobs_data[i].sum});
                    }
                    localStorage.setItem("jobsData", JSON.stringify(data))
                },
            )
            .catch(
                error => {
                    console.error(error)
                    if ((error.response.status >= 400) && (error.response.status < 500)) {
                        setErrorMessage('You are not authorized for this action!')
                        setRegistersData([])
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

    const retry = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return(
        token != null ? (
            registersData.length > 0 ? (
                <div class="page">
                    <div class="container col-xxl-8 px-1 py-1">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                            <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                              User Analytics. View User Activity & Site Usage
                            </h1>
                            <div class="col-lg-12">
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>USERS REGISTERED - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="USERS REGISTERED" />
                                        <VerticalBarSeries
                                            data={registersData}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>USERS LOGGED IN - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="USERS LOGGED IN" />
                                        <VerticalBarSeries
                                            data={loginsData}
                                            style={{stroke: 'violet', strokeWidth: 3}}
                                        />
                                    </XYPlot>
                                </div>
                                <br/><br/><br/><br/>
                                <div className="graph">
                                    <h3>JOBS RUN BY USERS - average per day</h3>
                                    <XYPlot
                                        width={1200}
                                        height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis title="PERIOD OF TIME (last days, from past to present)" />
                                        <YAxis title="JOBS RUN BY USERS" />
                                        <VerticalBarSeries
                                            data={jobsData}
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
                            <h2>Loading or no data found for <Link to={`/users`}>users</Link>.</h2>
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