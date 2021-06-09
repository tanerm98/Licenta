import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <header>
        <div className="header">
            <div className="navbar">
                <h1><Link to={`/workspaces`}>iOS Performance Monitor</Link></h1>
            </div>
        </div>
        <div className="settings">
            <div className="navbar">
                <h5><Link to={`/settings`}>Settings</Link></h5>
            </div>
        </div>
        <br />
    </header>
  );
}

export default Footer;
