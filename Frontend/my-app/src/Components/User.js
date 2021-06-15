import React from 'react'
import { Link } from 'react-router-dom';

export default function User(props){
    const {user} = props;

    var roleName = "ADMIN";
    if (user.roleId == 2) {
        roleName = "MANAGER";
    }
    if (user.roleId == 3) {
        roleName = "GUEST";
    }

    return (
        <div key={user.id} className="card">
            <div className="card-body">
                <h3> ID: {user.id} | USERNAME: <Link to={`/setRole/${user.id}`}> {user.username} </Link> | ROLE: {roleName}</h3>
            </div>
        </div>
    )
}