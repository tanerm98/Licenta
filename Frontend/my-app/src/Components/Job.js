import React from 'react'
import { Link } from 'react-router-dom';

export default function Workspace(props){
    const {job} = props;
    const summary = job.summary;

    return (
        <div key={job.id} className="card">
            <div className="card-body">
                <h3> Job ID: <Link to={`/job/${job.id}`}> {job.id} </Link></h3>
                <h3> Tested application: {job.app_bundle_id} </h3>
                <h3> PR ID: {job.pr_id} (0 - master branch)</h3>
                <h3> Test summary: </h3>
                <br/><br/>
                <text>
                    {job.summary.split("\\n").map((i,key) => {
                        return <div key={key}>{i}</div>;
                    })}
                </text>
                <br/>
            </div>
        </div>
    )
}