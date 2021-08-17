import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="white" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#/">
          <a href="/" className="logo">
            <span>
              <img src="./images/logo.svg" alt="" />
            </span>
            <span className="header-title">M E T A C L A S S</span>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="header-menu">
              <span>Home</span>
            </Link>
            <Link to="/login" className="header-menu">
              {localStorage.getItem("X_AUTH_TOKEN") ? (<span onClick={() => {
                    localStorage.removeItem("X_AUTH_TOKEN");}}>Log out</span>) : (<span>Login</span>)}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
