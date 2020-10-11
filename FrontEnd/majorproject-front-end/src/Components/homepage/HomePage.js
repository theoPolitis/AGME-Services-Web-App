import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class HomePage extends Component {

    render() {
        if(this.props.loggedInStatus === "LOGGED_IN"){
            return (
                <div className='homepage_container'>
                     <section className="homepage_phrase">Find a Service that suits you</section>
                     <i className="divider_homepage"></i>
                </div>
             )
        }

        return (
           <div className='homepage_container'>
                <section className="homepage_phrase">Find a Service that suits you</section>
                <i className="divider_homepage"></i>
                <div className="sign_up_button_div">
                    <Link to="/createAccount"><button className="sign_up_button">Sign Up</button></Link>
                </div>

           </div>
        )
    }
}
export default HomePage;
