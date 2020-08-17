import React, { Component } from 'react'
import '../homepage/HomePage.css';
import './Account.css';

class Signup extends Component {

    handleSubmit(event) {

    }

    
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
                        
                    <div className="container">
                        <h1>LOGIN</h1>
                        <form onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Firstname:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="firstname"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Lastname:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="lastname"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Email:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="email"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Address:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="address"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Username:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="username"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <label>
                                        Password:
                                    </label>
                                </div>
                                <div className="col-2">
                                    <input type="password" name="password"/>
                                </div>
                            </div>

                            <div className="row">
                            <div className="col-1">
                                <label>
                                    Confirm Password:
                                </label>
                            </div>
                            <div className="col-2">
                                <input type="password" name="confirm-password"/>
                            </div>
                        </div>

                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
          
                </main>
           </body>
        )
    }
}
export default Signup;
