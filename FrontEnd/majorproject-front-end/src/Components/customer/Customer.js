import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
  }

  componentDidMount() {
    this.reloadState();
  }

  reloadState() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      Axios.get(this.getMyBookingsUrl(), {})
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

  getMyBookingsUrl() {
    return (
      "http://localhost:8080/api/booking/customer/" + this.props.userAuth.id
    );
  }

  cancelBooking(bookingId) {
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

  render() {
    var bookings = this.state.bookings;

    // var bookingsDisplayArray = bookings.map((index) => (
    //   <p key={index}>{index[1] + " " + index[2] + " " + index[3] + " "}</p>
    // ));

    return (
      <body>
        <main>
          <Link to='/editDetails' className="accountButton">Edit Details</Link>
          <Link to='/changePassword' className="accountButton">Change Password</Link>

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
                      <span
                        className="button"
                        onClick={() => this.cancelBooking(booking.id)}
                      >
                        Cancel
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="SpecialInstructions">
              *choose a booking and then click on cancel
            </p>

          </div>
          <div className="container">
          <div className="detailsList">
                  <h1>{this.state.firstName}  {this.state.lastName}</h1>
                  <span>First Name:  </span><p>{this.state.firstName}</p><br/><br/>
                  <span>Last Name:  </span><p>{this.state.lastName}</p><br/><br/>
                  <span>Username:  </span><p>{this.state.userName}</p><br/><br/>
                  <span>Address:  </span><p>{this.state.address}</p><br/><br/>
                  <span>Email:  </span><p>{this.state.email}</p><br/><br/>
                  <span>Phone Number: </span><p>{this.state.mobileNumber}</p>
            </div>
          </div>
        </main>
      </body>

    );
  }
}
export default Customer;
