import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "./Customer.css";
import Axios from "axios";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.userAuth.firstName,
      lastName: this.props.userAuth.lastName,
      address: this.props.userAuth.address,
      email: this.props.userAuth.email,
      mobileNumber: this.props.userAuth.phoneNumber,
      userName: this.props.userAuth.username,
      oldPassword: "",
      newPassword: "",
      bookings: [],
      changedAnyFields: false,
    };

    this.cancellableBooking = true;
  }

  componentDidMount() {
    this.reloadState();
  }

  //gets the data from the backend
  reloadState() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      Axios.get(this.getMyBookingsUrl(), {})
        .then((res) => {
          this.setState({ bookings: res.data });
        })
        .catch((error) => {
          console.log(error);
          alert(
            "An error occured when getting the bookings from the database."
          );
        });
    }
  }

  //url for the api for retrivel from the backend
  getMyBookingsUrl() {
    return (
      "http://localhost:8080/api/booking/customer/" + this.props.userAuth.id
    );
  }

  //handles the button data ehrn casncelling a booking
  cancelBooking(bookingId) {
    console.log("button clicked");
    Axios.delete(`http://localhost:8080/api/booking/${bookingId}`)
      .then((res) => {
        this.reloadState();
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred when cancelling the booking.");
      });
  }

  //enabling and disabling the cancel button for each booking
  checkBookingStatus(booking) {
    var currentDateTime = new Date();
    //split date and time into year,month,day
    var sqlDate = booking.rosterDate.split(/[- :]/);
    var sqlTime = booking.rosterTime.split(/[ :]/);

    var bookingDateTime = new Date(
      sqlDate[0],
      sqlDate[1] - 1, //month is indexed differently in Date()
      sqlDate[2],
      sqlTime[0],
      sqlTime[1],
      sqlTime[2]
    );

    if (
      Math.floor(
        Math.abs(currentDateTime - bookingDateTime) / (60 * 60 * 24 * 1000)
      ) >= 2
    ) {
      this.cancellableBooking = true;
    } else {
      this.cancellableBooking = false;
    }
  }

  render() {
    var bookings = this.state.bookings;

    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return (
        // <div className="container">
        //   <h1>You must be logged in to use this feature</h1>
        // </div>
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    } else {
      return (
        <div>
          <div>
            <Link to="/editDetails" className="accountButton">
              Edit Details
            </Link>
            <Link to="/changePassword" className="accountButton">
              Change Password
            </Link>

            <div className="container">
              <h1 className="BookingsTitle"> My Bookings </h1>
              {/* the things should loop here but i have no idea how to do it */}
              <table className="bookings" id="bookings">
                <thead>
                  <tr>
                    <td>Booking date</td>
                    <td>Service</td>
                    <td>Employee Name</td>
                    <td>Cancel Booking</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr id={booking.id} key={booking.id}>
                      <td>
                        {booking.rosterDate} {booking.rosterTime}
                      </td>
                      <td>{booking.serviceName}</td>
                      <td>{booking.employee.firstName}</td>
                      <td>
                        {this.checkBookingStatus(booking)}
                        <button
                          disabled={!this.cancellableBooking}
                          className="cancelButton"
                          onClick={() => this.cancelBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="SpecialInstructions">
                *Choose a booking and then click on cancel <br />
                **You can't cancel booking during the last 2 days
              </p>
            </div>
            <div className="container">
              <div className="detailsList">
                <h1>
                  {this.state.firstName} {this.state.lastName}
                </h1>
                <span>First Name: </span>
                <label name="firstName">{this.state.firstName}</label>
                <br />
                <br />
                <span>Last Name: </span>
                <label name="lastName">{this.state.lastName}</label>
                <br />
                <br />
                <span>Username: </span>
                <label name="userName">{this.state.userName}</label>
                <br />
                <br />
                <span>Address: </span>
                <label name="address">{this.state.address}</label>
                <br />
                <br />
                <span>Email: </span>
                <label name="email">{this.state.email}</label>
                <br />
                <br />
                <span>Phone Number: </span>
                <label name="mobileNumber">{this.state.mobileNumber}</label>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Customer;
