import { Link } from 'react-router-dom';
import React, { Component } from 'react'

class Header extends Component {
    toggleLogout = () => {
        this.props.toggleLogout();
    }
    render() {
        if(this.props.customer === true){
            return (
                <header>
                <h1 className='Logo'>AGMEServices</h1>
                <div className='top_menu'>
                    <Link to="/" style={links_style} >Home</Link>
                    <Link to="/aboutus" style={links_style} >About us</Link>
                    <Link to='/booking' style={links_style}>Make a Booking</Link>
                    <Link to='/customer' style={links_style}>Customer</Link>
                    <Link to='/' style={links_style}><button onClick={() => this.toggleLogout()} className="register_button">Log Out</button></Link>
                </div>
            </header>
            )
        }else if(this.props.employee === true && this.props.user.admin){
            return (
                <header>
                    <h1 className='Logo'>AGMEServices</h1>
                    <div className='top_menu'>
                        <Link to="/" style={links_style} >Home</Link>
                        <Link to="/aboutus" style={links_style} >About us</Link>
                        <Link to='/employee' style={links_style}>Employee</Link>
                        <Link to="/roster" style={links_style}>Roster</Link>
                        <Link to="/analytics" style={links_style}>Analytics</Link>
                        <Link to='/' style={links_style}><button onClick={() => this.toggleLogout()} className="register_button">Log Out</button></Link>

                    </div>
                </header>
            )
        
        }else if(this.props.employee === true){
            return (
                <header>
                    <h1 className='Logo'>AGMEServices</h1>
                    <div className='top_menu'>
                        <Link to="/" style={links_style} >Home</Link>
                        <Link to="/aboutus" style={links_style} >About us</Link>
                        <Link to='/employee' style={links_style}>Employee</Link>
                        <Link to="/roster" style={links_style}>Roster</Link>
                        <Link to='/' style={links_style}><button onClick={this.props.toggleLogout.bind(this)} className="register_button">Log Out</button></Link>

                    </div>
                </header>
            )
        }else{
            return (
                <header>
                    <h1 className='Logo'>AGMEServices</h1>
                    <div className='top_menu'>
                        <Link to="/" style={links_style} >Home</Link>
                        <Link to="/aboutus" style={links_style} >About us</Link>
                        <Link to='/login' style={links_style}>Login</Link>
                        <Link to='/staffLogin' style={links_style}>Staff Login</Link>
                        <Link to='/createAccount' style={links_style}><button className="register_button">Register</button></Link>
                    </div>
            </header>
            )
        }
    }
}

const links_style = {
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '25px',
    textDecoration: 'none',
    color: 'white'
}

export default Header
