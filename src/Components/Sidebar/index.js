import React, { useState } from 'react';
import './style.css';
import { FaUserCircle } from "react-icons/fa";
import { GoDashboard } from "react-icons/go";
import { FiUsers, FiChevronDown, FiMessageSquare,FiLayers, FiCreditCard, FiSend, FiChevronUp, FiFolder, FiShoppingCart, FiFileText } from "react-icons/fi";
import { BsCaretRightFill } from "react-icons/bs";
// import { Navbar, Nav, NavDropdown, Accordion, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';

/**
* @author
* @function Sidebar
**/

const Sidebar = (props) => {

    const auth = useSelector(state => state.auth);

    const [toggle, setToggle] = useState(false);
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);



    const expand = (e) => {
        if (toggle) {
            setToggle(false);
        }
        if (!toggle) {
            setToggle(true);
            setToggle1(false);
            setToggle2(false);
            setToggle3(false);
            setToggle4(false);

        }
    }
    const expand1 = (e) => {
        if (toggle1) {
            setToggle1(false);
        }
        if (!toggle1) {
            setToggle1(true);
            setToggle(false);
            setToggle2(false);
            setToggle3(false);
            setToggle4(false);
        }
    }
    const expand2 = (e) => {
        if (toggle2) {
            setToggle2(false);
        }
        if (!toggle2) {
            setToggle2(true);
            setToggle1(false);
            setToggle(false);
            setToggle3(false);
            setToggle4(false);
        }
    }
    const expand3 = (e) => {
        if (toggle3) {
            setToggle3(false);
        }
        if (!toggle3) {
            setToggle3(true);
            setToggle1(false);
            setToggle2(false);
            setToggle(false);
            setToggle4(false);
        }
    }
    const expand4 = (e) => {
        if (toggle4) {
            setToggle4(false);
        }
        if (!toggle4) {
            setToggle4(true);
            setToggle1(false);
            setToggle2(false);
            setToggle3(false);
            setToggle(false);
        }
    }


    return (
        <div className="sidebar">
            <div className="profile-div">
                <div className="profile-icon">
                    <FaUserCircle size={80} />
                </div>
                <label className="usr-lbl">{auth.user.fullName}</label>
                <label className="role-lbl">{auth.user.role}</label>
            </div>
            {/*  */}
            <div className="header-lbl-div">
                <label className="header-lbl">Reports</label>
            </div>
            <div className="btn-group-header">
                <div className="btn">
                    <span className="icon1"><GoDashboard /></span>
                    <span className="title1">Dashboard</span>
                </div>
            </div>
            {/*  */}
            <div className="header-lbl-div">
                <label className="header-lbl">Management</label>
            </div>
            <div className="btn-group">
                <div className="btn-group-header">
                    <div className="btn" onClick={expand}>
                        <span className="icon1"><FiUsers /></span>
                        <span className="title1">Customers</span>
                        <span className="icon2">{toggle ? <FiChevronUp /> : <FiChevronDown />}</span>
                    </div>
                </div>
                {toggle ?
                    <div className="btn-group-body">
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>List Customer</span>
                        </div>
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>Edit Customer</span>
                        </div>
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>View Customer</span>
                        </div>
                    </div>
                    : null
                }
            </div>
            {/*  */}
            <div className="btn-group">
                <div className="btn-group-header">
                    <div className="btn" onClick={expand1}>
                        <span className="icon1"><FiShoppingCart /></span>
                        <span className="title1">Products</span>
                        <span className="icon2">{toggle1 ? <FiChevronUp /> : <FiChevronDown />}</span>
                    </div>
                </div>
                {toggle1 ?
                    <div className="btn-group-body1">
                        <div className="btn-1 btn-2">
                            <NavLink to={'/product/fetch'} className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>List Product</NavLink>
                        </div>
                        <div className="btn-1 btn-2">
                            <NavLink to={'/product/create'} className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>Create Product</NavLink>
                        </div>
                    </div>
                    : null
                }
            </div>
            {/*  */}
            <div className="btn-group">
                <div className="btn-group-header">
                    <div className="btn" onClick={expand2}>
                        <span className="icon1"><FiFolder /></span>
                        <span className="title1">Orders</span>
                        <span className="icon2">{toggle2 ? <FiChevronUp /> : <FiChevronDown />}</span>
                    </div>
                </div>
                {toggle2 ?
                    <div className="btn-group-body1">
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>List Orders</span>
                        </div>
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>View Orders</span>
                        </div>
                    </div>
                    : null
                }
            </div>
            {/*  */}
            <div className="btn-group">
                <div className="btn-group-header">
                    <div className="btn" onClick={expand3}>
                        <span className="icon1"><FiFileText /></span>
                        <span className="title1">Invoices</span>
                        <span className="icon2">{toggle3 ? <FiChevronUp /> : <FiChevronDown />}</span>
                    </div>
                </div>
                {toggle3 ?
                    <div className="btn-group-body1">
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>List Invoices</span>
                        </div>
                        <div className="btn-1 btn-2">
                            <span className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>View Invoices</span>
                        </div>
                    </div>
                    : null
                }
            </div>
            {/*  */}
            <div className="btn-group">
                <div className="btn-group-header">
                    <div className="btn" onClick={expand4}>
                        <span className="icon1"><FiLayers /></span>
                        <span className="title1">Category</span>
                        <span className="icon2">{toggle4 ? <FiChevronUp /> : <FiChevronDown />}</span>
                    </div>
                </div>
                {toggle4 ?
                    <div className="btn-group-body1">
                        <div className="btn-1 btn-2">
                            <NavLink to={'/category/fetch'} className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>Category List</NavLink>
                        </div>
                        <div className="btn-1 btn-2">
                            <NavLink to={'/category/create'} className="title1"><span style={{marginRight:"10px", color:'white'}} className="icon1"><BsCaretRightFill /></span>Create Category</NavLink>
                        </div>
                    </div>
                    : null
                }
            </div>
            {/*  */}
            <div className="header-lbl-div">
                <label className="header-lbl">Applications</label>
            </div>
            <div className="btn-group-header">
                <div className="btn">
                    <span className="icon1"><FiMessageSquare /></span>
                    <span className="title1">Chats</span>
                </div>
            </div>
            <div className="btn-group-header">
                <div className="btn">
                    <span className="icon1"><FiSend /></span>
                    <span className="title1">Mails</span>
                </div>
            </div>
            <div className="btn-group-header">
                <div className="btn">
                    <span className="icon1"><FiCreditCard /></span>
                    <span className="title1">Calender</span>
                </div>
            </div>

        </div>
    )

}

export default Sidebar