import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Employee.css";
import "../account/Account.css";
import Axios from "axios";

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      services: [],
      filters: {
        serviceNo: "",
        date: "",
      },
    };
  }

  componentDidMount() {
    this.reloadState();
  }

  reloadState() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      Axios.get("http://localhost:8080/api/serviceType/all", {}).then((res) => {
        this.setState({ services: res.data });
      });

      Axios.get(this.getBookingUrl(), {})
        .then((res) => {
          this.setState({ bookings: res.data });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "An error occured, it seems the backend cannot be reached or no services are present in our backend"
          );
        });
    }
  }

  changeServiceNo(serviceNo) {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          serviceNo: serviceNo,
        },
      },
      () => this.reloadState()
    );
  }

  changeDateFilter(date) {
    if (date == null) {
      document.getElementById("date-filter").value = "";
    }
    this.setState(
      {
        filters: {
          ...this.state.filters,
          date: date,
        },
      },
      () => this.reloadState()
    );
  }

  markAsDone(bookingId) {
    Axios.post(`http://localhost:8080/api/booking/${bookingId}/complete`)
      .then((res) => {
        this.reloadState();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "An error occured, it seems the backend cannot be reached or no services are present in our backend"
        );
      });
  }

  deleteBooking(bookingId) {
    Axios.delete(`http://localhost:8080/api/booking/${bookingId}`)
      .then((res) => {
        this.reloadState();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "An error occured, it seems the backend cannot be reached or no services are present in our backend"
        );
      });
  }

  //GET request determines which times the employee is already booked for on the day

  getBookingUrl() {
    if (this.isAdminUser()) {
      var params = [];
      if (this.state.filters.date) {
        params.push(`date=${this.state.filters.date}`);
      }
      if (this.state.filters.serviceNo) {
        params.push(`serviceNo=${this.state.filters.serviceNo}`);
      }
      let queryString = params.join("&");
      return `http://localhost:8080/api/booking/all?${queryString}`;
    }
    return (
      "http://localhost:8080/api/booking/employee/" +
      this.props.userAuth.employeeId
    );
  }

  isAdminUser() {
    return this.props.userAuth.admin === true;
  }

  render() {
    var jobs = this.state.bookings;
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

    //admin page
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
                <div className="col-1">
                  <label>Service:</label>
                </div>
                <div className="col-2">
                  <select
                    name="ServiceNo"
                    value={this.state.filters.serviceNo}
                    onChange={(e) => this.changeServiceNo(e.target.value)}
                  >
                    <option value="">Select an option:</option>
                    {this.state.services.map((service) => (
                      <option value={service.serviceNo} key={service.serviceNo}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                </div>
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
          </div>
        </div>
      );
    }

    //employee page
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
