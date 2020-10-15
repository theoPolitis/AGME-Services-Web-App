import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from 'react-router-dom';

class EmployeeAdd extends Component {
    constructor(props){
        super(props);

        this.state = {
            services: [],
            employeeIdentifier: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            userName: "",
            password: "",
            confirmPassword: "",
            serviceNo: "",
            errors: "",
            isSignedUp: false

        }

        axios.get("http://3.237.224.176:8080/api/serviceType/all", {}).then((res) => {
            this.setState({ services: res.data });
            this.setState({ serviceNo: res.data[0].serviceNo });
        });

    }

    handleSubmit = (event) => { 
        event.preventDefault();
        //console.log(this.state)
        if(this.validate(this.state.password, this.state.confirmPassword) === true){
            axios.post("http://3.237.224.176:8080/api/employee", {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    employeeIdentifier: this.state.employeeIdentifier,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    address: this.state.address,
                    userName: this.state.userName,
                    password: this.state.password,
                    serviceNo: this.state.serviceNo
            }).then(res => {
                if(res.status === 201){
                    this.setState({ isSignedUp: true });
                }

            }).catch(error => {
                alert("Username or Employee Identifier already exists");
                //console.log(error);
            })

            //console.log("form Submitted");
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
        } else {
            return false;
       }

    }

    render() {
        if(this.state.isSignedUp === true){
            return <Redirect to={{pathname: "/employee"}}/>;
        }

        return (
                
            <div className="container">
                <h1>New Employee</h1>
                <form onSubmit={this.handleSubmit}>


                    <div className="row">
                        <div className="col-1">
                            <label>
                                Employee Identifier:
                            </label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="employeeIdentifier" placeholder="Employee Identifier" value={this.state.employeeIdentifier} onChange={this.handleChange} required/>
                        </div>
                    </div>

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

                    <div className="row">
                        <div className="col-1">
                            <label>
                                Service:
                            </label>
                        </div>
                        <div className="col-2">
                        <select
                        name="serviceNo"
                        value={this.state.serviceNo}
                        onChange={this.handleChange}
                        >
                        {this.state.services.map((service) => (
                            <option value={service.serviceNo}>
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                        
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

                    <button type="submit" value="Submit">Create</button>
                </form>
            </div>

        )
    }
}
export default EmployeeAdd;
