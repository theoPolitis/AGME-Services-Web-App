import React, { Component } from 'react'
import '../homepage/HomePage.css';
import './Account.css';

class Signup extends Component {

    constructor(props){
        super(props);
    }

    handleSubmit(event) {

    }

    
    render() {
        return (
                
            <div className="container">
                //testing purposes
                <h1>Logged in status: {this.props.loggedInStatus}</h1>
                <h1>Sign Up</h1>
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

        )
    }
}
export default Signup;
