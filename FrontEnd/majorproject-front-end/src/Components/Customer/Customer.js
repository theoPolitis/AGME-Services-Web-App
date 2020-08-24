import React, { Component } from "react";
import "./Customer.css";

class Customer extends Component {
  handleSubmit(event) {}

  render() {
    var bookings = [
      ["1", "20/10/2020", "10.00am", "Hair cut"],
      ["1", "20/10/2020", "11.00am", "Manicure"],
      ["1", "20/10/2020", "12.00pm", "something else"],
      ["1", "20/10/2020", "1.00pm", "something else"],
      ["1", "20/10/2020", "2.00pm", "something else"],
      ["1", "20/10/2020", "3.00pm", "something else"],
    ];

    var bookingsDisplayArray = bookings.map((index) => (
      <p>{index[1] + " " + index[2] + " " + index[3] + " "}</p>
    ));

    return (
      <div>
        <h1 className="BookingsTitle"> My Bookings </h1>

        {/* the things should loop here but i have no idea how to do it */}
        <ul className="Bookings">{bookingsDisplayArray}</ul>

        <button name="Cancel">Cancel</button>

        <p className="SpecialInstructions">
          *select the booking and then click on cancel
        </p>

        {/* the attribute value called dulshan should be changed into whatever is in the list/array */}
        <form className="FormAttribute" method="get">
          <label>
            First Name:
            <input value="Dulshan" type="text" name="firstName" size="100" />
          </label>
          <label>
            Last Name:
            <input value="Dulshan" type="text" name="lastName" size="100" />
          </label>
          <label>
            Address:
            <input value="Dulshan" type="text" name="address" size="100" />
          </label>
          <label>
            Email:
            <input value="Dulshan" type="text" name="email" size="100" />
          </label>
          <label>
            Mobile Number:
            <input value="Dulshan" type="text" name="mobileNumber" size="100" />
          </label>
          <label>
            User Name:
            <input value="Dulshan" type="text" name="userName" size="100" />
          </label>
          <label>
            Old Password:
            <input
              placeholder="Enter the old password"
              type="text"
              name="oldPassword"
              size="100"
            />
          </label>
          <label>
            New Password:
            <input
              placeholder="Enter the new password"
              type="text"
              name="newPassword"
              size="100"
            />
          </label>
          <input className="UpdateButton" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
export default Customer;
