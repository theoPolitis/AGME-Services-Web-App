import React, { Component } from "react";
import "./Customer.css";
import Axios from "axios";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "Dulshan",
      lastName: "Dulshan",
      address: "Dulshan",
      email: "Dulshan",
      mobileNumber: "Dulshan",
      userName: "Dulshan",
      oldPassword: "",
      newPassword: "",
      bookings: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.reloadState();
  }

  reloadState() {
    if (this.props.loggedInStatus == "LOGGED_IN") {
      Axios.get(this.getMyBookingsUrl(), {})
        .then(res => {
          this.setState({ bookings: res.data })
        }).catch(error => {
          console.log(error)
          alert("An error occured, it seems the backend cannot be reached or no services are present in our backend")
        });
    }
  }

  getMyBookingsUrl() {
    return "http://localhost:8080/api/booking/customer/" + this.props.userAuth.id;
  }

  cancelBooking(bookingId) {
    Axios.delete(`http://localhost:8080/api/booking/${bookingId}`).then(res => {
      this.reloadState();
    }).catch(error => {
      console.log(error)
      alert("An error occured, it seems the backend cannot be reached or no services are present in our backend")
    })
  }

  handleSubmit(event) { }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    var bookings = this.state.bookings;

    var bookingsDisplayArray = bookings.map((index) => (
      <p>{index[1] + " " + index[2] + " " + index[3] + " "}</p>
    ));

    return (
      <div class="container">
        <h1 className="BookingsTitle"> My Bookings </h1>

        {/* the things should loop here but i have no idea how to do it */}

        <table class="bookings" id="bookings">
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
            {bookings.map((booking) =>
              <tr id={booking.id}>
                <td>{booking.rosterDate} {booking.rosterTime}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.employee.email}</td>
                <td><span class="button" onClick={() => this.cancelBooking(booking.id)}>Cancel</span></td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="SpecialInstructions">
          *select the booking and then click on cancel
        </p>

        {/* the attribute value called dulshan should be changed into whatever is in the list/array */}
        <form className="FormAttribute" method="get">
          <label>
            First Name:
            <input
              value={this.state.firstName}
              type="text"
              name="firstName"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              value={this.state.lastName}
              type="text"
              name="lastName"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              value={this.state.address}
              type="text"
              name="address"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              value={this.state.email}
              type="text"
              name="email"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              value={this.state.mobileNumber}
              type="text"
              name="mobileNumber"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            User Name:
            <input
              value={this.state.userName}
              type="text"
              name="userName"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Old Password:
            <input
              value={this.state.oldPassword}
              placeholder="Enter the old password"
              type="text"
              name="oldPassword"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            New Password:
            <input
              value={this.state.newPassword}
              placeholder="Enter the new password"
              type="text"
              name="newPassword"
              size="100"
              onChange={this.handleChange}
              required
            />
          </label>
          <input className="UpdateButton" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
export default Customer;
