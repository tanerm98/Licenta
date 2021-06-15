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
        <tr>
            <td>{user.id}</td>
            <td><Link to={`/setRole/${user.id}`}> {user.username} </Link></td>
            <td>{roleName}</td>
        </tr>
    )
}