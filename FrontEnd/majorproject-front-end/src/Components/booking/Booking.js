import React, { Component } from "react";
import "./Booking.css";
import "../account/Account.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      employees: [],
      bookingTimes: [],
      alreadyBooked: [],
      selectedService: "",
      selectedEmployee: "",
      selectedDate: "",
      selectedTime: "",
      buttonDisabled: true,
      employeeDisabled: true,
      dateDisabled: true,
      timeDisabled: true,
      serviceTypeDetails: [],
    };
    //retrieves all front end services
    Axios.get("http://localhost:8080/api/serviceType/all", {})
      .then((res) => {
        this.setState({ services: res.data });
      })
      .catch((error) => {
        console.log(error.response.status);
        alert(
          "An error occured, it seems the backend cannot be reached or no services are present in our backend"
        );
      });
  }

  componentDidMount = () => {};

   //Called when we submit our data, assumes that the state has been properly managed.
  handleSubmit = (event) => {
    //The relevant data is put into the relevant format
    var postData = {};
    postData["employeeIdentifier"] = this.state.selectedEmployee;
    postData["customerIdentifier"] = this.props.user.identificationNumber;
    postData["serviceNo"] = this.state.selectedService;
    postData["rosterTime"] = this.state.selectedTime;
    postData["rosterDate"] = this.state.selectedDate;
    //Sending the data as a post request, which creates a new booking in the backend.
    Axios.post("http://localhost:8080/api/booking/newBooking", postData)
      .then((res) => {
        alert(res.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        alert("An error occured, you booking was not created");
      });
    //Refreshes the state to allow for more bookings to be created.
    this.setState({ employees: [],
      employeeDisabled: true,
      dateDisabled: true,
      bookingTimes: [],
      buttonDisabled: true,
      timeDisabled: true 
     });
    //Prevents the default submission of the form.
    event.preventDefault();
  };

  //Called when the user selects which service they are booking
  handleServiceSelection = (event) => {
    //Set the state of the service
    this.setState({ selectedService: event.target.value });
    //Checking if the selected option is not the "none" attribute
    if (event.target.value !== "none") {
      //Retrieve all of the employees for the service
      Axios.get(
        "http://localhost:8080/api/employee/all/" + event.target.value,
        {}
      )
        .then((res) => {
          var employees = res.data;
          employees = employees.filter((emp) => !emp.admin);
          this.setState({ employees: employees,
            employeeDisabled: false,
            dateDisabled: true,
            bookingTimes: [],
            buttonDisabled: true,
            timeDisabled: true
            });
        })
        .catch((error) => {
          alert("An error occured, details : " + error.response.status);
        });
      //Gets more details for the specifically selected service.
      Axios.get(
        "http://localhost:8080/api/serviceType/" + event.target.value,
        {}
      )
        .then((res) => {
          //passers GET data to app.js
          this.setState({ serviceTypeDetails: res.data });
        })
        .catch((e) => {
          this.setState({
            error: true,
          });
          if (this.state.error === true) {
            console.log(
              "Something went wrong in booking.js in get handleServiceSelection, getting service details"
            );
          }
        });
    } else {
      //If we reached this statement, then no service has been selected and we clear the state variables.
      this.setState({ employees: [],
        employeeDisabled: true,
        dateDisabled: true,
        bookingTimes: [],
        buttonDisabled: true,
        timeDisabled: true
        });
    }
  };

  //Called when the user selects an employee
  handleEmployeeSelection = (event) => {
    //Sets the state of the employee
    this.setState({ selectedEmployee: event.target.value });
    //If an actual employee was selected, we set the relevant state variables
    if (event.target.value !== "none") {
      this.setState({ dateDisabled: false,
        buttonDisabled: true,
        timeDisabled: true,
        times: []
       });
    } else {
      //otherwise we set the values to placeholders.
      this.setState({ dateDisabled: true,
        buttonDisabled: true,
        bookingTimes: []
       });
    }
  };

  handleDateSelection = (event) => {
    //Creates date objects to represent today, the selected day, and a week from now.
    var date = new Date(event.target.value);
    var today = new Date();
    var nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 8
    );
    //If the selected date is in the future, proceed
    if (
      today.getTime() < date.getTime() &&
      date.getTime() < nextWeek.getTime()
    ) {
      var flag = true;
      var weekDay = date.getDay();
      var employee = this.state.employees.find((employee) => {
        return employee.employeeIdentifier === this.state.selectedEmployee;
      });
      switch (weekDay) {
        case 0:
          if (!employee.roster.sunday) {
            flag = false;
          }
          break;
        case 1:
          if (!employee.roster.monday) {
            flag = false;
          }
          break;
        case 2:
          if (!employee.roster.tuesday) {
            flag = false;
          }
          break;
        case 3:
          if (!employee.roster.wednesday) {
            flag = false;
          }
          break;
        case 4:
          if (!employee.roster.thursday) {
            flag = false;
          }
          break;
        case 5:
          if (!employee.roster.friday) {
            flag = false;
          }
          break;
        case 6:
          if (!employee.roster.saturday) {
            flag = false;
          }
          break;
        default:
          flag = true;
      }
      //if the day is a day the employee is rostered on, we continue
      if (flag) {
        //Formatting the date to the correct date
        var year = "" + date.getFullYear();
        var month = "" + (date.getMonth() + 1);
        var day = "" + date.getDate();
        if (month.length < 2) {
          month = "0" + month;
        }
        if (day.length < 2) {
          day = "0" + day;
        }
        //Create a formatted string that we can send as post data.
        var formattedDate = year + "-" + month + "-" + day;
        this.setState({ selectedDate: formattedDate });
        //Create all booking timeslots that a service has
        var endTime = parseInt(this.state.serviceTypeDetails.endTime);
        var startTime = parseInt(this.state.serviceTypeDetails.startTime);
        var times = [];
        for (var i = startTime; i < endTime; i++) {
          times.push(i + ":00");
        }
        //GET request determines which times the employee is already booked for on the day
        Axios.get(
          "http://localhost:8080/api/booking/" +
            formattedDate +
            "/" +
            this.state.selectedEmployee,
          {}
        )
          .then((res) => {
            this.setState({ alreadyBooked: res.data }, function () {
              var booked = res.data;
              for (let i = 0; i < booked.length; i++) {
                times = times.filter((item) => item !== booked[i].time);
              }
              this.setState({ bookingTimes: times });
            });
            this.setState({ timeDisabled: false });
          })
          .catch((e) => {
            //If no booking times are detected, then no times are removed from the selection list.
            if (e.response.status === 400) {
              this.setState({ timeDisabled: false,
                bookingTimes: times
               });
            }
          });
      } else {
        //if the date is a day the employee isn't rostered, we inform the user.
        this.setState({ bookingTimes: [],
          buttonDisabled: true,
          timeDisabled: true
         });
        alert("Employee is not working on this day");
      }
    } else {
      //If we are in this segment, it means the date is either in the past or beyond a week from now
      this.setState({ bookingTimes: [],
        buttonDisabled: true,
        timeDisabled: true
       });
      if (today.getTime() > date.getTime()) {
        //Printed if the date is in the past
        alert("Please Select a Date that is Not in the past!");
      } else {
        //Printed if the date is beyond a week from now.
        alert("You can only select bookings withing the next 7 days");
      }
    }
  };

  //Called when a booking time is selected.
  handleTimeSelection = (event) => {
    //Make sure the selected value is a relevant one
    if (event.target.value !== "none") {
      //Set the state, and enable the submit button
      this.setState({ selectedTime: event.target.value + ":00",
      buttonDisabled: false
     });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    //Checks if the user is logged in when they navigate to the page
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <div className="container">
          <h1 className="BookingTitle">Make A Booking</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-1">
                <label>Service:</label>
              </div>
              <div className="col-2">
                <select
                  name="ServiceNo"
                  className="ServiceNo"
                  value={this.state.value}
                  onChange={this.handleServiceSelection}
                >
                  <option value="none">Select an option:</option>
                  {this.state.services.map((service) => (
                    <option value={service.serviceNo}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div className="col-1">
                <label>Employee:</label>
              </div>
              <div className="col-2">
                <select
                  name="employeeNo"
                  className="employeeNo"
                  value={this.state.value}
                  onChange={this.handleEmployeeSelection}
                  disabled={this.state.employeeDisabled}
                >
                  <option value="none">Select an option</option>
                  {this.state.employees.map((employee) => (
                    <option value={employee.employeeIdentifier}>
                      {employee.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div className="col-1">
                <label>Booking Date:</label>
              </div>
              <div className="col-2">
                <input
                  type="date"
                  className="date"
                  disabled={this.state.dateDisabled}
                  onChange={this.handleDateSelection}
                ></input>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div className="col-1">
                <label>Booking Time:</label>
              </div>
              <div className="col-2">
                <select
                  className="time"
                  value={this.state.value}
                  onChange={this.handleTimeSelection}
                  disabled={this.state.timeDisabled}
                >
                  <option value="none">Select an Option</option>
                  {this.state.bookingTimes.map((time) => (
                    <option value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <br></br>
            <input
              className="updateButton"
              type="submit"
              value="Submit"
              disabled={this.state.buttonDisabled}
            />
          </form>
        </div>
      );
    } else {
      //Redirects the user to the home page if they are not logged in
      return <Redirect to={{ pathname: "/" }} />;
    }
  }
}
export default Booking;
