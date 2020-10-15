import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Employee.css";
import "../account/Account.css";
import Axios from "axios";

class Employee extends Component {
  constructor(props) {
    super(props);

    // States of bookings, serives, employees and filters
    this.state = {
      bookings: [],
      services: [],
      employees: [],
      filters: {
        serviceNo: this.props.userAuth.serviceNo,
        date: "",
      },
    };
  }

  componentDidMount() {
    this.reloadState();
  }

  // data to be reloaded upon refresh/reloading page
  reloadState() {
    // only to be done if logged in
    if (this.props.loggedInStatus === "LOGGED_IN") {

      // get all bookings under the selected service
      Axios.get(this.getBookingUrl(), {})
        .then((res) => {
          // the result is stored in the bookings state
          this.setState({ bookings: res.data });
        })
        // logs error to console if encoutered + window alert
        .catch((error) => {
          console.log(error);
          alert(
            "An error occured, it seems the backend cannot be reached or no services are present in our backend"
          );
        });

        // get all employees under the current service
        Axios.get("http://localhost:8080/api/employee/all/"+this.props.userAuth.serviceNo)
        .then((res) => {
          this.setState({employees: res.data });
        })
        // logs error to console if encoutered
        .catch((error) => {
          console.log(error);
        });

    }
  }

  // function to run to change displayed bookings based on the date
  changeDateFilter(date) {
    if (date == null) {
      document.getElementById("date-filter").value = "";
    }
    // sets the filter to the state
    this.setState(
      {
        filters: {
          ...this.state.filters,
          date: date,
        },
      },
      // reloads the state to apply filters
      () => this.reloadState()
    );
  }

  // mark booking as done via a post request
  markAsDone(bookingId) {
    Axios.post(`http://localhost:8080/api/booking/${bookingId}/complete`)
      .then((res) => {
        // reloads the state so changes can take effect
        this.reloadState();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "An error occured, it seems the backend cannot be reached or no services are present in our backend"
        );
      });
  }

  // delete booking based on a delete request
  deleteBooking(bookingId) {
    Axios.delete(`http://localhost:8080/api/booking/${bookingId}`)
      .then((res) => {
        // reloads state to update changes
        this.reloadState();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "An error occured, it seems the backend cannot be reached or no services are present in our backend"
        );
      });
  }

  editEmployee(id) {
    Axios.get(`http://localhost:8080/api/employee/${id}`)
    .then((res) => {
      // changes the selected employee prop to admin's chosen user from list
      this.props.selectEmployee(res.data);
      // changes the page to the edit page
      this.props.history.push('/editEmployee');
    })
    .catch((error) => {
      console.log(error);
      alert("Error retreiving employee data to edit.");
    });
  }

  //GET request determines which times the employee is already booked for on the day

  getBookingUrl() {
    // bookings for admin
    if (this.isAdminUser()) {
      // paramters are used to filter the serviceNo and date
      var params = [];
      if (this.state.filters.date) {
        params.push(`date=${this.state.filters.date}`);
      }
      params.push(`serviceNo=${this.props.userAuth.serviceNo}`);
      let queryString = params.join("&");
      return `http://localhost:8080/api/booking/all?${queryString}`;
    }
    // bookings for employees
    return (
      "http://localhost:8080/api/booking/employee/" +
      this.props.userAuth.employeeId
    );
  }

  // checks if the logged in user is an admin
  isAdminUser() {
    return this.props.userAuth.admin === true;
  }

  render() {
    // sets variables to be loaded into the tables
    var jobs = this.state.bookings;
    var employees = this.state.employees;


    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector("ul");
    if (list) {
      list.addEventListener(
        "click",
        function (ev) {
          if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
          }
        },
        false
      );
    }

    // ADMIN PAGE -----------------------------------------------------
    if (this.isAdminUser()) {
      return (
        <div>
          <div>
            <Link to="/businessWorkingHours" className="accountButton">
              Edit Working Hours for the week
            </Link>
            <div className="container_emp">
              <h1>Bookings</h1>
              <div className="row">
                <div className="col-2">
                  <div>
                    <label>Booking Date:</label>
                  </div>
                  <div className="col-2">
                    <input
                      type="date"
                      id="date-filter"
                      value={this.state.filters.date}
                      onChange={(e) => this.changeDateFilter(e.target.value)}
                    ></input>
                    <span
                      className="button"
                      onClick={() => this.changeDateFilter(null)}
                    >
                      Clear date filter
                    </span>
                  </div>
                </div>
              </div>

              <table className="bookings" id="bookings">
                <thead>
                  <tr>
                    <td>Booking date</td>
                    <td>Service</td>
                    <td>Employee email</td>
                    <td>Customer email</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr id={job.id} key={job.id}>
                      <td>
                        {job.rosterDate} {job.rosterTime}
                      </td>
                      <td>{job.serviceName}</td>
                      <td>{job.employee.email}</td>
                      <td>{job.customer.email}</td>
                      <td>
                        <span
                          className="button"
                          onClick={() => this.deleteBooking(job.id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="container">
            <h1>Employee Registry</h1>
            <table className="bookings" id="bookings">
              <thead>
                <tr>
                  <td>Identifier</td>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Email</td>
                  <td>Username</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
  
              <tbody>
              {employees.map((emp) => (
                <tr id={emp.employeeId}>
                  <td>{emp.employeeIdentifier}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.userName}</td>
                  <td>
                    <span
                      className="button"
                      onClick={() => this.editEmployee(emp.employeeIdentifier)}
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
  
            <br></br>
  
            <Link to='/addEmployee' className="accountButton right">Add Employee</Link>
  
            </div>
  
          </div>
        </div>
      );
    }

    // EMPLOYEE PAGE ---------------------------------------------------
    return (
      <div>
        <div>
          <div className="container_emp">
            <h1>Employee</h1>
            <h1>Roster</h1>

            <table className="bookings" id="bookings">
              <thead>
                <tr>
                  <td>Booking date</td>
                  <td>Service</td>
                  <td>Customer name</td>
                  <td>Customer email</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr id={job.id} key={job.id}>
                    <td>
                      {job.rosterDate} {job.rosterTime}
                    </td>
                    <td>{job.serviceName}</td>
                    <td>
                      {job.customer.firstName} {job.customer.lastName}
                    </td>
                    <td>{job.customer.email}</td>
                    <td>
                      <span
                        className="button"
                        onClick={() => this.markAsDone(job.id)}
                      >
                        Done
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="SpecialInstructions">
              *select the job and then click on Done when you complete it or
              want to remove it
            </p>

            <h1>Details</h1>

            <form>
              <div className="row">
                <div className="col-1">
                  <label>First Name:</label>
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    name="firstname"
                    value={this.props.userAuth.firstName}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-1">
                  <label>Last Name:</label>
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    name="lastname"
                    value={this.props.userAuth.lastName}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-1">
                  <label>Email:</label>
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    name="email"
                    value={this.props.userAuth.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-1">
                  <label>Address:</label>
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    name="address"
                    value={this.props.userAuth.address}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-1">
                  <label>Mobile Number:</label>
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    name="mobilenumber"
                    value={this.props.userAuth.phoneNumber}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Employee;
