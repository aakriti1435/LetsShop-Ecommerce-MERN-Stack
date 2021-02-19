import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';

function Header() {

    const SignInSignUpLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signIn" className="nav-link">SignIn</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signUp" className="nav-link">SignUp</NavLink>
                </li>
            </Nav>
        )
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Link to='/' className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <SignInSignUpLinks />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
