import React, { Component } from 'react'
import './Account.css';
import Axios from 'axios';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            loginErrors: "",
            loggedInUser: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggeleGet=(username, password)=> {
        Axios.get("http://localhost:8080/api/customer/" + username + "/" + password, {
        })
        .then(res => {
            this.setState({
                loggedInUser: res.data
            })
            console.log(this.state.loggedInUser);
        }).catch(e => {
            if(e.response.status === 400){
                alert("Username or password is incorrect");
            }
        })
    }

    handleSubmit(e) {
        this.toggeleGet(this.state.username, this.state.password);
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    render() {
        return (
                
            <div className="container">
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

export default Login;
