import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header>
        <h1 className='Logo'>AGMEServices</h1>
            <div className='top-menu'>
                <Link to="/" style={linkStyle} >Home</Link>
                <Link to='/booking' style={linkStyle}>Make a Booking</Link>
                <Link to='/employee' style={linkStyle}>Employee</Link>
                <Link to='/customer' style={linkStyle}>Customer</Link>
                <Link to='/login' style={linkStyle}>Login</Link>
                <Link to='/staffLogin' style={linkStyle}>Staff Login</Link>
                <Link to='/createAccount' style={linkStyle}><button className="RegisterButton">Register</button></Link>
            </div>
        </header>
    )
}

const linkStyle = {
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '25px',
    textDecoration: 'none',
    color: 'white'
}

export default Header;
