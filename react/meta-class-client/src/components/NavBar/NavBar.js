import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-rouer-dom';

function NavBar() {
    return (

      <Navbar bg="white" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#/">
            <a href="/" className="logo">
              <span><img src="./images/logo.svg" alt="" /></span>
              <span className="header-title" >M E T A  C L A S S</span>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar