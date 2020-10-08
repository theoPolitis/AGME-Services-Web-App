import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import "../customer/Customer.css";

class BusinessWorkingHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceTypeDetails: [],
      startTime: "",
      endTime: "",
    };
    this.serviceNo = "";
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isAdmin() {
    return this.props.userAuth.admin === true;
  }

  handleSubmit = (event) => {
    var postData = {};
    postData["startTime"] = this.state.startTime;
    postData["endTime"] = this.state.endTime;

    axios
      .put(
        "http://localhost:8080/api/serviceType/" + this.serviceNo, // either this link is wrong or the method in the back end is not implemented
        postData
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Trading hours have been changed successfully");
          this.props.history.push("/employee");
        }

        //if there is any error it is caught here
      })
      .catch((error) => {
        alert("ERROR");
        console.log(error);
      });

    event.preventDefault();
  };

  componentDidMount() {
    this.getWorkingHourInformation(this.serviceNo);
  }

  getWorkingHourInformation = async (serviceNo) => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      axios
        .get("http://localhost:8080/api/serviceType/" + serviceNo, {})
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
              "Something went wrong in BusinessWorkingHours.js in get request"
            );
          }
        });
    }
  };

  render() {
    this.serviceNo = "1E"; //need to set the correct service no here so that the correct information is shown here
    if (this.props.loggedInStatus === "NOT_LOGGED_IN" && !this.isAdmin()) {
      return (
        <Redirect
          to={{ pathname: "/staffLogin", state: { from: this.props.location } }}
        />
      );
    } else {
      return (
        <div className="container">
          <div className="detailsList">
            <h1>Current Times:</h1>
            <span>Start Time: </span>
            <label>{this.state.serviceTypeDetails.startTime}</label>
            <br />
            <span>End Time: </span>
            <label>{this.state.serviceTypeDetails.endTime}</label>
          </div>
          <div>
            <h1>Edit Times</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Start Time:</label>
              <input
                value={this.state.startTime}
                type="text"
                name="startTime"
                onChange={this.handleChange}
                placeholder="Enter openning time as a 24hr form string(eg:hh:mm)"
                required
              />
              <label>End Time:</label>
              <input
                value={this.state.endTime}
                type="text"
                name="endTime"
                onChange={this.handleChange}
                placeholder="Enter closing time as a 24hr form string(eg:hh:mm)"
                required
              />
              <input type="submit" className="UpdateButton" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default BusinessWorkingHours;
