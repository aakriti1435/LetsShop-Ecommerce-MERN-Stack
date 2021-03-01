import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions/user';

function Header() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(signout());
    };

    const SignOutLink = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>SignOut</span>
                </li>
            </Nav>
        )
    };

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
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ zIndex: 1 }}
      >
        <Container fluid>
          <Link to="/" className="navbar-brand">
            Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ cursor: "pointer" }}
          >
            <Nav className="mr-auto"></Nav>
            {user.authenticate ? <SignOutLink /> : <SignInSignUpLinks />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Header;
