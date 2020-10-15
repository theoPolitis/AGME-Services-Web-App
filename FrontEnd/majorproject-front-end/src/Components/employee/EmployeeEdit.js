import React, { Component } from "react";
import axios from "axios";

import "./Employee.css"

class EmployeeEdit extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstName: this.props.selectedEmployee.firstName,
            lastName: this.props.selectedEmployee.lastName,
            address: this.props.selectedEmployee.address,
            phoneNumber: this.props.selectedEmployee.phoneNumber,
            email: this.props.selectedEmployee.email,
            userName: this.props.selectedEmployee.userName,
            password: "",
            confirmPassword: ""
        };
      }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    isAdminUser() {
        if(this.props.userAuth != null) {
            return this.props.userAuth.admin === true;
        } else {
            return false;
        }
            
    }

    handleSubmit = (event) => {
        if (this.state.password === this.state.confirmPassword) {
            var postData = {}
            postData["firstName"] = this.state.firstName;
            postData["lastName"] = this.state.lastName;
            postData["address"] = this.state.address;
            postData["phoneNumber"] = this.state.phoneNumber;
            postData["email"] = this.state.email;
            postData["userName"] = this.state.userName;
            postData["password"] = this.state.password;
            postData["confirmPassword"] = this.state.confirmPassword;

            axios.put('http://localhost:8080/api/employee/'+this.props.selectedEmployee.employeeIdentifier, 
            postData).then(res => {
                if (res.status === 200){
                    alert("Details changed successfully")
                    this.props.history.push('/employee')
                } 

            }).catch(error => {
                alert("ERROR");
                console.log(error);
            })
        } else {
            alert("Passwords do not match")
        }
        
        event.preventDefault();
    } 

    render() {
        
        if (this.isAdminUser()) {
            return(
                <div className="container">
                <h1>{this.state.firstName + " " + this.state.lastName}</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Firstname:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="firstName" pattern="([A-Za-z])+([A-Za-z])+([A-Za-z])+" title="Three or more letter name" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Lastname:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="lastName" pattern="([A-Za-z])+([A-Za-z])+([A-Za-z])+" title="Three or more letter Last name" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Email:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
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
                            <input type="text" name="phoneNumber" pattern="[0-9]*" title="please only use numbers in the phonenumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Username:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="userName" pattern="([A-Z]|[a-z]|[0-9])+([A-Z]|[a-z]|[0-9])+([A-Z]|[a-z]|[0-9])+" title="Must be at least three charcters long and must only contain lowercase, upercase and numbers only" placeholder="Username" value={this.state.userName} onChange={this.handleChange} required/>
                        </div>
                    </div>

                    <p className="SpecialInstructions">Please note: If password fields are left blank, they will not be processed.</p>

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Password:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-1">
                        <label>
                            Confirm Password:
                        </label>
                    </div>
                    <div className="col-2">
                        <input type="password" name="confirmPassword" placeholder="Confrim Password" value={this.state.confirmPassword} onChange={this.handleChange}/>
                    </div>
                </div>

                    <button type="submit" value="Submit">Update</button>
                </form>
            </div>
            );
        } else {
            return(
                <div className="container">
                    <h1>You must be signed in with an Administrator account to access this feature.</h1>
                </div>
            );
        }
    }

}

export default EmployeeEdit