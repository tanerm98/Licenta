import React from 'react'
import { Link } from 'react-router-dom';

export default function Workspace(props){
    const {job} = props;
    const summary = job.summary;

    return (
        <div key={job.id} className="card">
            <div className="card-body">
                <h3> Job ID: <Link to={`/job/${job.id}`}> {job.id} </Link></h3>
                <h3> Tested Application: {job.app_bundle_id} </h3>
                <h3> PR ID: {job.pr_id} (0 - master branch)</h3>
                <br/><br/>
                <h3> Test Summary </h3>
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
                <br/>
            </div>
        </div>
    )
}