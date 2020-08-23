import React, { Component } from "react";
import "./Customer.css";

class Customer extends Component {
  constructor() {
    super();

    const numbers = ["one", "two", "three", "four"];

    var bookings = [
      [
        "Dulshan",
        "Kodithuwakku",
        "12,savichi st, elephant",
        "s3813354@student.rmit.edu.au",
        "0405611615",
        "Dulshank",
        "12345A",
      ],
      [
        "Elias",
        "Sembol",
        "12,savichi st, elephant",
        "s3813354@student.rmit.edu.au",
        "0405611615",
        "Dulshank",
        "12345B",
      ],
    ];
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Lato"
        />
        <h1 className="Logo">UIServices</h1>
        <div className="Links">
          <a className="Services">Services</a>
          <a className="Staff_Login">Staff Login</a>
          <a className="Login">Login</a>
          <a className="Button_Background"></a>
          <a className="Register">Register</a>
        </div>

        <h1 className="BookingsTitle"> My Bookings </h1>

        {/* the things should loop here but i have no idea how to do it */}
        <ul className="Bookings">
          <p>something</p>
          <p>something</p>
          <p>something</p>
          <p>something</p>
        </ul>

        <button name="Cancel">Cancel</button>

        <p className="SpecialInstructions">
          *select the booking and then click on cancel
        </p>

        {/* the attribute value called dulshan should be changed into whatever is in the list/array */}
        <form className="FormAttribute">
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
            <input value="Dulshan" type="text" name="oldPassword" size="100" />
          </label>
          <label>
            New Password:
            <input value="Dulshan" type="text" name="newPassword" size="100" />
          </label>
          <input className="UpdateButton" type="submit" value="Update" />
        </form>
      </div>
    );
  }
}
export default Customer;

// state = {
//     bookings: [
//         {
//             firstName:'Dulshan',
//             lastName:'Kodithuwakku',
//             address:'12,savichi st, elephant',
//             email:'s3813354@student.rmit.edu.au',
//             mobile:'0405611615',
//             userName:'Dulshank',
//             password:'12345A'

//         },
//         {
//             firstName:'Elias',
//             lastName:'Sembol',
//             address:'12,savichi st, elephant',
//             email:'s3813354@student.rmit.edu.au',
//             mobile:'0405611615',
//             userName:'Dulshank',
//             password:'12345B'

//         }
//     ]
// }
