import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import { BiLogOutCircle } from 'react-icons/bi';
import { FaExclamationTriangle } from 'react-icons/fa';

import Unauthorized from '../Components/Unauthorized';

export default function LoginScreen() {

    const token = localStorage.getItem("token");

    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        let path = "/"
        history.push(path)
    };

    return (
        token != null ? (
            <div class="page">
              <div class="container col-xxl-8 px-1 py-1">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                  <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                    Account Settings & Admin Dashboard: Users and User Activity Analytics
                  </h1>
                  <div class="col-10 col-sm-8 col-lg-6">
                    <img src="https://image.flaticon.com/icons/png/512/158/158704.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
                  </div>
                  <div class="col-lg-6">
                    <br/>
                    <p class="lead">
                        <h2><Link to={`/users`}>Users</Link></h2>
                            <ul>
                              <li>View all the users of this web application;</li>
                              <li>View and set roles for each user.</li>
                            </ul>
                        <br/>
                        <h2><Link to={`/analytics`}>User Activity Analytics</Link></h2>
                            <ul>
                              <li>View number of users registered per day;</li>
                              <li>View number of active logged in users per day;</li>
                              <li>View total number of performance tests run per day.</li>
                            </ul>
                        <br/>
                    </p>
                    <button type="button" onClick={logout} class="btn btn-outline-secondary btn-lg px-4"><Link to={"/"}> <BiLogOutCircle/> Logout </Link></button>
                  </div>
                </div>
              </div>
            </div>
        ) : (
            <Unauthorized/>
        )

    )
}