import React from 'react'
import { Link } from 'react-router-dom';

export default function PerfMetric(props){
    const {perfMetric} = props;
    var dateString = perfMetric.today_date;
    var truncatedDateString = dateString.substring(0, 10);
    return (
        <div key={perfMetric.today_date} className="card">
            <div className="card-body">
                <h3> {truncatedDateString}: {perfMetric.avg} </h3>
            </div>
        </div>
    )
}