import React, { Component } from 'react'
import './Booking.css';
import '../account/Account.css'
import Axios from 'axios';
class Booking extends Component {

    constructor()
    {
        super()
        
        this.state = {
            services: [],
            employees: [],
            bookingTimes: [6,7,8,9,10,11,12,1,2,3,4,5,6],
            selectedService:"",
            selectedEmployee:"",
            selectedDate:"",
            selectedTime:"",
            buttonDisabled: false,
            employeeDisabled: true,
            dateDisabled: true,
            timeDisabled:true
        }
        Axios.get("http://localhost:8080/api/serviceType/all",{}).then(
            res => {this.setState({services: res.data})
        this.setState({dateDisabled: true})
        this.setState({timeDisabled: true})}
        ).catch(error => {
            console.log(error.res.data)
            console.log("bruh")
        })
        console.log(this.state)
    }

    handleSubmit(event) 
    {
        console.log(event.data)
        console.log("bruh")
        alert(event)
    }

    handleServiceSelection = (event) =>
    {
        this.setState({selectedService: event.target.value})
        console.log(event.target.value !== "none")
        if(event.target.value !== "none")
        {
            Axios.get("http://localhost:8080/api/employee/all/"+event.target.value,{}).then(
            res => {this.setState({employees: res.data})
                this.setState({employeeDisabled: false})
            }
            ).catch(error => {
                alert("An error occured")
            })
        }else{
            this.setState({employees: []})
            this.setState({employeeDisabled: true})
            this.setState({dateDisabled: true})
        }
        
    }

    handleEmployeeSelection = (event) =>
    {
        this.setState({selectedEmployee: event.target.value})
        console.log(this.state.selectedEmployee !== null)
        if(this.state.selectedEmployee !== null)
        {
            this.setState({dateDisabled: false})
        }
    }

    handleDateSelection = (event) =>
    {
        var date =new Date(event.target.value)
        var today = new Date()
        if(today.getTime() < date.getTime())
        {
            var year = ''+date.getFullYear();
            var month = '' + (date.getMonth() + 1);
            var day = ''+date.getDate();
            console.log(month.length)
            if(month.length < 2)
            {
                month = "0" + month
            }
            if(day.length < 2)
            {
                day = "0"+day
            }
            var formattedDate = year + "-" + month + "-"+day
            console.log(formattedDate)
        }else{

        }
    }

    render() {
        return (
          
                        
                        <div className = "container">
                        <h1 className = "BookingTitle">Make A Booking</h1>
                            <form onSubmit={this.handleSubmit}>

                                <div className="row">
                                    <label className="col-1">
                                        Service:
                                    </label>
                                    <select className="col-2" name = "ServiceNo"onChange={this.handleServiceSelection}>
                                        <option value = "none">Select an option:</option>
                                        {this.state.services.map((service) => (<option value = {service.serviceNo}>{service.serviceName}</option>))}
                                    </select>
                                </div>

                                <div className="row">
                                    <label className="col-1">
                                        Employee:
                                    </label>
                                    <select className="col-2" name = "employeeNo" onChange={this.handleEmployeeSelection} disabled = {this.state.employeeDisabled}>
                                        <option value = "none">Select an option</option>
                                            {this.state.employees.map((employee) => (<option value = {employee.employeeNo}>{employee.firstName}</option>))}
                                    </select>
                                </div>

                                <div className="row">
                                    <label className="col-1">
                                        Booking Date:
                                    </label>
                                    <input type="date" className="col-2" disabled = {this.state.dateDisabled} onChange={this.handleDateSelection}>

                                    </input>
                                </div>

                                <div className="row">
                                    <label className="col-1">
                                        Booking Time:
                                    </label>
                                    <select type="text" className="col-2">
                                        <option value = "none"></option>
                                            {this.state.bookingTimes.map((time) => (<option value = {time}>{time} - {time + 1}</option>))}
                                    </select>
                                </div>
                                <div className="row"></div>
                                <input className="updateButton" type="submit" value="Submit" disabled = {this.state.buttonDisabled}/>
                                
                            </form>
                        </div>
        )
    }
}
export default Booking;
