import React, { Component } from "react";
import axios from "axios";

class AccountEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            identificationNumber: this.props.currentCustomer.identificationNumber,
            firstName: this.props.currentCustomer.firstName,
            lastName: this.props.currentCustomer.lastName,
            address: this.props.currentCustomer.address,
            phoneNumber: this.props.currentCustomer.phoneNumber,
            email: this.props.currentCustomer.email
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        var postData = {}
        postData["firstName"] = this.state.firstName;
        postData["lastName"] = this.state.lastName;
        postData["address"] = this.state.address;
        postData["phoneNumber"] = this.state.phoneNumber;
        postData["email"] = this.state.email;

        console.log(this.state.identificationNumber)

        axios.put('http://localhost:8080/api/customer/'+this.state.identificationNumber, 
        postData).then(res => {
            if (res.status === 200){
                alert("Details changed successfully")
                this.props.history.push('/customer')
            } 

        }).catch(error => {
            alert("ERROR");
            console.log(error);
        })

        event.preventDefault();
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
                            value={this.state.firstName}
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                        />
                        <label>Last Name:</label>
                        <input
                            value={this.state.lastName}
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                        />
                        <label>Email:</label>
                        <input
                            value={this.state.email}
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                        />
                        <label>Phone Number:</label>
                        <input
                            value={this.state.phoneNumber}
                            type="text"
                            name="phoneNumber"
                            onChange={this.handleChange}
                        />
                        <label>Address:</label>
                        <input
                            value={this.state.address}
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

export default AccountEdit;