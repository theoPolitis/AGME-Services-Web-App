import React, { Component } from 'react'
import './Account.css';

class StaffLogin extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {

    }

    
    render() {
        return (
                
            <div className="container">
                //testing purposes
                <h1>Logged In Status: {this.props.loggedInStatus}</h1>
                <h1>STAFF LOGIN</h1>
                <form onSubmit={this.handleSubmit}>

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

                    <input type="submit" value="Submit"/>
                </form>
            </div>

        )
    }
}
export default StaffLogin;
