import React from 'react'

import { Nav, Navbar } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';
import { CgPerformance } from 'react-icons/cg';
import { ImHome } from 'react-icons/im';

const Header = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Collapse className="justify-content-start">
            <Navbar.Text>
              <a href="#/"> <ImHome /> Home </a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Brand href="#workspaces">
            <div class="navbar-text">
                <CgPerformance/> Service Connect
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#settings"> <AiFillSetting /> Settings </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      <div class="b-example-divider"></div>
    </div>
  );
}

export default Header;