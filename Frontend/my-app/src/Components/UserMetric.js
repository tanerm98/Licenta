import React from 'react'
import { Link } from 'react-router-dom';

export default function UserMetric(props){
    const {userMetric} = props;
    var dateString = userMetric.today_date;
    var truncatedDateString = dateString.substring(0, 10);
    return (
        <div key={userMetric.today_date} className="card">
            <div className="card-body">
                <h3> {truncatedDateString}: {userMetric.sum} </h3>
            </div>
        </div>
    )
}