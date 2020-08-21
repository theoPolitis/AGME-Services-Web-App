import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
           <div className='homepageStyle'>
                        <section className="Phrase">Find a Service that suits you</section>
                        <a className="Line"></a>
                        <div className="Sign_Up_Button">
                            <Link to="/createAccount"><button className="Sign_Up">Sign Up</button></Link>
                        </div>
           </div>
        )
    }
}
export default HomePage;
