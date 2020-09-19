import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

import "./Customer.css";

class CustomerEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentCustomer: this.props.currentCustomer
        }
    }

    handleChange = (event) => {
        this.setState({currentCustomer: {[event.target.name]: event.target.value}});
    }

    handleSubmit = (event) => {
        axios.post('http://localhost:8080/api/customer', {
            identificationNumber: this.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address
        }).then(res => {
            if(res.status === 201){
                return <Redirect to={{pathname: "/customer"}}/>;
            }

        }).catch(error => {
            alert("Username already exists");
            console.log(error);
        })
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
                    <h1>Edit Details</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>First Name:</label>
                        <input
                            value={this.state.currentCustomer.firstName}
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                        />
                        <label>Last Name:</label>
                        <input
                            value={this.state.currentCustomer.lastName}
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                        />
                        <label>Email:</label>
                        <input
                            value={this.state.currentCustomer.email}
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                        />
                        <label>Phone Number:</label>
                        <input
                            value={this.state.currentCustomer.phoneNumber}
                            type="text"
                            name="phoneNumber"
                            onChange={this.handleChange}
                        />
                        <label>Address:</label>
                        <input
                            value={this.state.currentCustomer.address}
                            type="text"
                            name="address"
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

export default CustomerEdit;