import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function Header() {
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container>
                <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Nav>
                        <Nav.Link>Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
