import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../homepage/HomePage.css';
import './Account.css';

class Signup extends Component {
    id = uuidv4();
    constructor(props){
        super(props);

        this.state = {
            personIdentifier: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            userName: "",
            password: "",
            confirmPassword: "",
            errors: ""

        }



    }

    handleSubmit = (event) => { 
        event.preventDefault();
        if(this.validate(this.state.password, this.state.confirmPassword) === true){
            const newCustomer = {
                personIdentifier: this.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                userName: this.state.userName,
                password: this.state.password
            }

            console.log(newCustomer);
            console.log("form Submitted");
        }else{
            alert("Passwords do not match");
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

        }

    validate(password, confirmPassword){
        if(password === confirmPassword){
            return true;
        }else{
            return false;
       }

    }

    render() {
        return (
                
            <div className="container">
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
                            <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Lastname:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Email:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Address:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Phone Number:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Username:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="userName" placeholder="Username" value={this.state.userName} onChange={this.handleChange} required/>
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

                    <div className="row">
                    <div className="col-1">
                        <label>
                            Confirm Password:
                        </label>
                    </div>
                    <div className="col-2">
                        <input type="password" name="confirmPassword" placeholder="Confrim Password" value={this.state.confirmPassword} onChange={this.handleChange} required/>
                    </div>
                </div>

                    <button type="submit" value="Submit">Register</button>
                </form>
            </div>

        )
    }
}
export default Signup;
