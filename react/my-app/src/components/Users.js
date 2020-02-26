import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Users(props) {
    console.log(props.user);
    if (props.user == null)
    {
    return (
        <div>
            <Link to="/login">Login</Link>
        </div>
    )
    }
    else {
        return (
            <div>
                
                <div>{props.user.name}</div>
                <a href={`http://localhost:4000/auth/logout`}><button onClick={props.logout}>Log out</button></a>
                <button onClick={props.logout}>Log out for token</button>
            </div>
        )
    }
}
export default Users;