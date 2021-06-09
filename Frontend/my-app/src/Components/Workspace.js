import React from 'react'
import { Link } from 'react-router-dom';

export default function Workspace(props){
    const {workspace} = props;
    return (
        <div key={workspace.app_bundle_id} className="card">
            <div className="card-body">
                <h3> Bundle ID: <Link to={`/workspace/${workspace.app_bundle_id}`}> {workspace.app_bundle_id} </Link></h3>
                <h3>Description: {workspace.description}</h3>
                <h3> Repository Link: <a target="_blank" href={`https://${workspace.repository_link}`}> {workspace.repository_link} </a></h3>
            </div>
        </div>
    )
}