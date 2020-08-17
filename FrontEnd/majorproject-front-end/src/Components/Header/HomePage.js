import React, { Component } from 'react'
import './HomePage.css';
class HomePage extends Component {
    render() {
        return (
           <body>
                <main>
                    <header>
                        <nav>
                            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
                            <h1 className="Logo">UIServices</h1>
                            <div className="Links">
                                <a className="Services">Services</a>
                                <a className="Staff_Login">Staff Login</a>
                                <a className="Login">Login</a>
                                <a className="Button_Background"></a>
                                <a className="Register">Register</a>
                            </div>
                        </nav>
                    </header>
                        <section className="Phrase">Find a Service that suits you</section>
                        <a className="Line"></a>
                        <div className="Sign_Up_Button">
                            <a className="Sign_Up">Sign Up</a>
                            <a className="Sign_Up_Background"></a>
                            <a className="Sign_Up">Sign Up</a>
                        </div>
          
                </main>
           </body>
        )
    }
}
export default HomePage;
