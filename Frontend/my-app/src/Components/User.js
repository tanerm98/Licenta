import React from 'react'
import { Link } from 'react-router-dom';

export default function User(props){
    const {user} = props;
    return (
        <div key={user.id} className="card">
            <div className="card-body">
                <h3> User ID: {user.id} </h3>
                <h3> Username: <Link to={`/setRole/${user.id}`}> {user.username} </Link></h3>
                <h3> Role ID: {user.roleId} (1 - ADMIN, 2 - MANAGER, 3 - GUEST)</h3>
            </div>
        </div>
    )
}