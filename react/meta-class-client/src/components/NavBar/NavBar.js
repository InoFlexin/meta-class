import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar