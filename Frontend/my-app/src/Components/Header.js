import React from 'react'

import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#workspaces">
            <div class="navbar-text">
                iOS Performance Monitor
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav.Link href="#/">About</Nav.Link>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#settings"> Settings </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
  );
}

export default Header;