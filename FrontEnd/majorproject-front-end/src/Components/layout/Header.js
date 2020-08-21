import React from 'react';
import './Layout.css';
//import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1 className='logo'>AGMEServices</h1>
            <nav className='top-menu'>
                <a>Home</a>
                <a>Make a Booking</a>
                <a>Employee</a>
                <a>Customer</a>
                <a>Login</a>
                <a>Staff Login</a>
                <button className="RegisterButton">Register</button>
            </nav>
        </header>
    )
}

export default Header;
