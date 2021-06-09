import React from 'react'
import { Link } from 'react-router-dom';

export default function Workspace(props){
    const {job} = props;
    return (
        <div key={job.id} className="card">
            <div className="card-body">
                <h3> Job ID: <Link to={`/job/${job.id}`}> {job.id} </Link></h3>
                <h3> PR ID: {job.pr_id} </h3>
            </div>
        </div>
    )
}