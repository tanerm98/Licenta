import axios from 'axios';

import React from 'react'
import { Link } from 'react-router-dom';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiFillWarning } from 'react-icons/ai';

import { Table } from 'react-bootstrap';

export default function Job(props){
    const {job} = props;
    const token = localStorage.getItem("token");

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
            },
        )
        .catch(
            error => {
                console.error(error)
            },
        );
    };

    return (
        <tr>
            <td class="text-center">
                {job.id}
                <br/>
                <button class="btn btn-sm px-1" onClick={(e) => deleteJob(job.id, e)}><RiDeleteBin6Line/></button>
            </td>
            <td class="text-center">{job.pr_id}</td>
            <td class="text-center">
                <Table striped bordered hover>
                    <thead>
                        <tr class="text-center">
                            <th>APP SIZE</th>
                            <th>LAUNCH DURATION AFTER INSTALL</th>
                            <th>MEMORY USAGE AFTER INSTALL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {job.summary.split(/[->\n]+/).map((i,key) => {
                            if ((key != 0) && (key != 4) && (i != "\\n")) {
                                if (!i.includes("--")){
                                    var v1 = i.replace(">", "")
                                    if (v1.includes("APP SIZE")) {
                                        var v7 = v1.replace("APP SIZE:", "")
                                        if (v7.includes(":x:")) {
                                            return <td><div key={key}><h6>{v7.replace(":x:", "")} <AiFillWarning/></h6></div></td>
                                        } else if (v7.includes(":white_check_mark:")) {
                                            return <td><div key={key}><h6>{v7.replace(":white_check_mark:", "")} <AiOutlineCheckCircle/></h6></div></td>
                                        } else {
                                            return <td><div key={key}><h6>{v7} </h6></div></td>
                                        }
                                    }
                                    else if (v1.includes("DURATION") && !v1.includes("DEVICE")) {
                                        var v7 = v1.replace("DURATION:", "")
                                        if (v7.includes(":x:")) {
                                            return <td><div key={key}><h6>{v7.replace(":x:", "")} <AiFillWarning/></h6></div></td>
                                        } else if (v7.includes(":white_check_mark:")) {
                                            return <td><div key={key}><h6>{v7.replace(":white_check_mark:", "")} <AiOutlineCheckCircle/></h6></div></td>
                                        } else {
                                            return <td><div key={key}><h6>{v7} </h6></div></td>
                                        }
                                    }
                                    else if (v1.includes("MEMORY USAGE") && !v1.includes("DEVICE")) {
                                        var v7 = v1.replace("MEMORY USAGE:", "")
                                        if (v7.includes(":x:")) {
                                            return <td><div key={key}><h6>{v7.replace(":x:", "")} </h6> <AiFillWarning/> </div></td>
                                        } else if (v7.includes(":white_check_mark:")) {
                                            return <td><div key={key}><h6>{v7.replace(":white_check_mark:", "")} <AiOutlineCheckCircle/></h6></div></td>
                                        } else {
                                            return <td><div key={key}><h6>{v7} </h6></div></td>
                                        }
                                    }
                                } else {
                                    return <br/>
                                }
                            }
                        })}
                    </tbody>
                </Table>

                <br/>

                <Table striped bordered hover>
                    <thead>
                        <tr class="text-center">
                            <th>DEVICE</th>
                            <th>LAUNCH TYPE</th>
                            <th>LAUNCH DURATION</th>
                            <th>MEMORY USAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {job.summary.split(/[->\n]+/).map((i,key) => {
                            if ((key != 0) && (key != 4) && (i != "\\n")) {
                                if (!i.includes("--")){
                                    var v1 = i.replace(">", "")
                                    if (v1.includes("DEVICE") && v1.includes("LAUNCH TYPE")) {
                                        var v2 = v1.replace("DEVICE:", "")
                                        var v3 = v2.replace("LAUNCH TYPE:", "")
                                        return <tr>
                                            {v3.split("|").map((i2, key2) => {
                                                var v4 = i2.replace("DURATION:", "")
                                                var v5 = v4.replace("MEMORY USAGE:", "")
                                                if (v5.includes(":x:")) {
                                                    return <td><div key={key2}><h6>{v5.replace(":x:", "")} <AiFillWarning/></h6></div></td>
                                                } else if (v5.includes(":white_check_mark:")) {
                                                    return <td><div key={key2}><h6>{v5.replace(":white_check_mark:", "")} <AiOutlineCheckCircle/></h6></div></td>
                                                } else {
                                                    return <td><div key={key2}><h6>{v5} </h6></div></td>
                                                }
                                            })}
                                        </tr>;
                                    }
                                } else {
                                    return <br/>
                                }
                            }
                        })}
                    </tbody>
                </Table>
            </td>
        </tr>
    )
}