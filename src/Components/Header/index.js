import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { FiUser, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Logout_Action} from '../../Actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // This function Will run When Logout button will be clicked.
    const logout = () => {
        dispatch(Logout_Action());
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout} >Logout</span>
                </li>
            </Nav>
        );
    }

    const renderNonLoggedInLinks = () => {
        return (
            <NavDropdown className="drop-div" title={<FiUser />} id="collasible-nav-dropdown">
                <li className="nav-item">
                    <NavLink to="login" className="nav-link drop-lbl active"><span><FiLogIn /></span>Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link drop-lbl"><span><FiUserPlus /></span>SignUp</NavLink>
                </li>
            </NavDropdown>
        );
    }
    return (
        <>
            <Navbar className="navbar-bg" collapseOnSelect expand="lg" bg="dark" variant="dark">
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">atDoor</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Nav>
                    <Nav className="ml-auto">
                        <li className="nav-item">
                            <NavLink to="aboutus" className="nav-link link2" >About Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="contactus" className="nav-link link2" >Contact Us</NavLink>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}

export default Header