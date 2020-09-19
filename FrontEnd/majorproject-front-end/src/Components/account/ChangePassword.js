import React, { Component } from "react";
import axios from "axios";

class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            identificationNumber: this.props.currentCustomer.identificationNumber,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        var postData = {}
        postData["password"] = this.state.newPassword;

        if (this.validatePasswordFields() === "ok") {
            axios.put('http://localhost:8080/api/customer/'+this.state.identificationNumber, 
        postData).then(res => {
            if (res.status === 200){
                alert("Password changed successfully")
                this.props.history.push('/customer')
            } 

            }).catch(error => {
                alert("ERROR");
                console.log(error);
            })
        } else {
            alert(this.validatePasswordFields())
        }

        event.preventDefault();
    }

    validatePasswordFields() {
        if (this.state.oldPassword === this.props.currentCustomer.password) {
            if (this.state.newPassword === this.state.confirmPassword) {
                console.log("VALIDATED")
                return "ok";
            } else {
                return "Passwords do not match";
            }
        } else {
            return "Old password is incorrect";
        }
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            return(
                <div className="container">
                    <h1>You must be logged in to use this feature</h1>
                </div>
            );
        } else {
            return(
                <div className="container left">
                    <h1>Change Password</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            onChange={this.handleChange}
                        />
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={this.handleChange}
                        />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={this.handleChange}
                        />
                        <input
                            type="submit"
                            className="UpdateButton"
                        />
                    </form>
                </div>
            );
        }
        
    }
}

export default ChangePassword;