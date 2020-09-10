import React, { Component } from 'react'
import './Account.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }

    }

    //handles GET Request
    toggeleGet = async(username, password)=> {
        //passes username and password the user entered and retreives a customer
        try{
            axios.get("http://localhost:8080/api/customer/" + username + "/" + password, {
            })
            .then(res => {
                this.setState({
                    loggedIn: true
                })

                //passers GET data to app.js
                this.props.customerAuth(res.data);
            }).catch(e => {
                this.setState({
                    error: true
                })
                //if cant find customer then request is sent back a 400 error handles accordingly
                if(this.state.error === true){
                    alert("Username or password incorrect");
                }
            })
     }catch(e){
        
        }
    }

    handleSubmit = (e) => {
        this.toggeleGet(this.state.username, this.state.password);
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    render() {
        //if customer exists redirect
        if(this.state.loggedIn === true){
            return <Redirect to={{pathname: "/"}}/>
        }

        return (
                
            <div className="container">
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
