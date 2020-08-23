import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {

    render() {
        return (
           <div className='homepageStyle'>
                <section className="Phrase">Find a Service that suits you</section>
                <i className="Line"></i>
                <div className="Sign_Up_Button">
                    <Link to="/createAccount"><button className="Sign_Up">Sign Up</button></Link>
                    <h1>Logged In Status: {this.props.loggedInStatus}</h1>
                </div>

           </div>
        )
    }
}
export default HomePage;
