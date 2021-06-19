import axios from 'axios';

import React from 'react'
import { Link } from 'react-router-dom';

import { RiDeleteBin6Line } from 'react-icons/ri';

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
                {job.summary.split("\\n").map((i,key) => {
                    if (key == 0) {
                        return <div key={key}><h4>{i.replace(">", "")}</h4></div>;
                    }
                    if (!i.includes("--")){
                        return <div key={key}><h6>{i.replace(">", "")}</h6></div>;
                    } else {
                        return <br/>
                    }
                })}
            </td>
        </tr>
    )
}