import React, { Component } from 'react'
import './Account.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        console.log("Form Submitted");
        e.preventDefault();

    }

    handleChange(e) {
        console.log("handle change ", e);
    }

    
    render() {
        return (
                
            <div className="container">
            //Testing purposes for logged in user
                <h1>Logged in Status: {this.props.loggedInStatus} </h1>
                <h1>LOGIN</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Username:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Password:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <button type="submit">Log in</button>
                </form>
            </div>

        )
    }
}

const testStyle = {
    color: "White"
}
export default Login;
