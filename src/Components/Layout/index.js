import React from 'react'
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Header from '../Header';
// import { NavLink } from 'react-router-dom';
import './style.css';
import Sidebar from '../Sidebar';
/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <div className="body-bar">
                        <Sidebar/>
                        <div className="midbar">
                            {props.children}
                        </div>
                    </div>
                    :
                    props.children
            }
        </>
    )

}

export default Layout