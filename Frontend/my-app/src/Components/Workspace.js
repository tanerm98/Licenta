import axios from 'axios';

import React from 'react'
import { Link } from 'react-router-dom';

import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Workspace(props){
    const {workspace} = props;
    const token = localStorage.getItem("token");

    const deleteWorkspace = (workspaceId, e) => {
        e.preventDefault();
        axios.delete(
            `http://localhost:3002/api/v1/workspaces/${workspaceId}`,
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
            <td><Link to={`/workspace/${workspace.app_bundle_id}`}> <button class="btn btn-sm px-1" onClick={(e) => deleteWorkspace(workspace.app_bundle_id, e)}> <RiDeleteBin6Line/> </button> {workspace.app_bundle_id} </Link></td>
            <td>{workspace.description}</td>
            <td><a target="_blank" href={`https://${workspace.repository_link}`}> {workspace.repository_link} </a></td>
        </tr>
    )
}