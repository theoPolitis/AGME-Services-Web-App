import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";

import Employee from "./Components/employee/Employee";
import Header from "./Components/layout/Header.js";
import HomePage from "./Components/homepage/HomePage";
import Signup from "./Components/account/Signup.js";
import Login from "./Components/account/Login.js";
import StaffLogin from "./Components/account/StaffLogin";
import Booking from "./Components/booking/Booking";
import AboutUs from "./Components/aboutUs/AboutUs";
import Customer from "./Components/customer/Customer";
import Roster from "./Components/roster/Roster";
import Analytics from "./Components/analytics/Analytics";
import AccountEdit from "./Components/account/AccountEdit";
import PasswordChange from "./Components/account/PasswordChange";
import BusinessWorkingHours from "./Components/account/BusinessWorkingHours";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //this will boolean at some point but can change later
      loggedInStatus: "NOT_LOGGED_IN",
      employee: false,
      customer: false,
      user: {},
    };
  }

  customerAuth = (data) => {
    this.setState({
      user: data,
      customer: true,
      loggedInStatus: "LOGGED_IN",
    });
  };

  employeeAuth = (data) => {
    this.setState({
      user: data,
      employee: true,
      loggedInStatus: "LOGGED_IN",
    });
    if (data.admin === true) {
      this.populateAnalytics(data);
    }
  };

  toggleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      customer: false,
      employee: false,
      user: {},
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Header
            toggleLogout={this.toggleLogout}
            customer={this.state.customer}
            employee={this.state.employee}
          />

          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
          />

          <Route exact path="/aboutus" component={AboutUs} />

          <Route exact path="/roster" render={(props) => (<Roster {...props} user={this.state.user} customerAuth={this.customerAuth} loggedInStatus={this.state.loggedInStatus} />)}></Route>

          <Route exact 
            path="/analytics" 
            render={(props) => (
              <Analytics 
                {...props} 
                user={this.state.user}
                employees={this.state.employees}
                rosterInfo = {this.state.rosterInfo}
                dates = {this.state.dates}
                bookingInfo = {this.state.bookingDetails} 
                customerAuth={this.customerAuth} 
                loggedInStatus={this.state.loggedInStatus} 
              />
            )}/>

          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                customerAuth={this.customerAuth}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />

          <Route
            path="/createAccount"
            render={(props) => (
              <Signup {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
          />

          <Route
            path="/staffLogin"
            render={(props) => (
              <StaffLogin
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                employeeAuth={this.employeeAuth}
              />
            )}
          />

          <Route
            path="/booking"
            render={(props) => (
              <Booking
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />

          <Route
            path="/customer"
            render={(props) => (
              <Customer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                userAuth={this.state.user}
                customer={this.state.customer}
              />
            )}
          />

          <Route
            path="/editDetails"
            render={(props) => (
              <AccountEdit
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                currentCustomer={this.state.user}
              />
            )}
          />

          <Route
            path="/businessWorkingHours"
            render={(props) => (
              <BusinessWorkingHours
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                userAuth={this.state.user}
                employee={this.state.employee}
              />
            )}
          />

          <Route
            path="/changePassword"
            render={(props) => (
              <PasswordChange
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                currentCustomer={this.state.user}
              />
            )}
          />

          <Route
            path="/employee"
            render={(props) => (
              <Employee
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                userAuth={this.state.user}
                employee={this.state.employee}
                customer={this.state.customer}
              />
            )}
          />
        </div>
      </Router>
    );
  }

  populateAnalytics = (user) => {
    //Get all of the employees from the database
    Axios.get("http://localhost:8080/api/employee/all/" + user.serviceNo, {}).then(
      (res) => { this.setState({ employees: res.data.filter((emp) => (emp.admin === false)) }, this.populateRosterInformation(res.data)) }
    ).catch(
      (error) => {
        console.log(error);
        alert("An error occured");
      }
    );

  }

  populateRosterInformation = (employees) => {
    employees = employees.filter((emp) => (emp.admin===false));
    //Get the roster information for each employee
    var roster = employees.map((employee) => (employee.roster));
    //records how many staff are rostered on for the each day of the week (Sunday-Saturday)
    var numAvailable = [0, 0, 0, 0, 0, 0, 0];
    var i;
    //Checks each roster and increments the relevant working days.
    for (i = 0; i < roster.length; i++) {
      var rost = roster[i];
      if (rost.sunday) {
        numAvailable[0] += 1;
      }
      if (rost.monday) {
        numAvailable[1] += 1;
      }
      if (rost.tuesday) {
        numAvailable[2] += 1;
      }
      if (rost.wednesday) {
        numAvailable[3] += 1;
      }
      if (rost.thursday) {
        numAvailable[4] += 1;
      }
      if (rost.friday) {
        numAvailable[5] += 1;
      }
      if (rost.saturday) {
        numAvailable[6] += 1;
      }
    }
    //Saves the working days in state
    this.setState({ rosterInfo: numAvailable });
    var bookingDataArray = [];
    //Calculate the next 7 working days dates in the correct format
    var today = new Date();
    var dates = [];
    for (i = 0; i < 8; i++) {
      var date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i);

      var year = "" + date.getFullYear();
      var month = "" + (date.getMonth() + 1);
      var day = "" + date.getDate();

      if (month.length < 2) {
        month = "0" + month;
      }

      if (day.length < 2) {
        day = "0" + day;
      }

      var formattedDate = year + "-" + month + "-" + day;
      dates.push(formattedDate);
    }
    this.setState({dates: dates});
    //Find the relevant bookings for each employee by querying the backend
    employees.map((employee) => (Axios.get("http://localhost:8080/api/booking/employee/"
      + employee.employeeId, {})
      .then(
        (res) => { bookingDataArray.push({ name: employee.firstName, dates: this.employeePlot(res.data, dates) }); }
      ).then().catch(
        (error) => {
          console.log(error);
          alert("An error occured");
        }
      )));

    this.setState({ bookingDetails: bookingDataArray, dates: dates });
  }

  employeePlot = (bookings, dates) => {
    var data;
    data = bookings.map((booking) => booking.rosterDate);
    var dateOccurence = [0, 0, 0, 0, 0, 0, 0, 0];
    var i;
    for (i = 0; i < data.length; i++) {
      switch (data[i]) {
        case dates[0]:
          dateOccurence[0] += 1;
          break;
        case dates[1]:
          dateOccurence[1] += 1;
          break;
        case dates[2]:
          dateOccurence[2] += 1;
          break;
        case dates[3]:
          dateOccurence[3] += 1;
          break;
        case dates[4]:
          dateOccurence[4] += 1;
          break;
        case dates[5]:
          dateOccurence[5] += 1;
          break;
        case dates[6]:
          dateOccurence[6] += 1;
          break;
        case dates[7]:
          dateOccurence[7] += 1;
          break;
      }
    }
    return dateOccurence;
  }

}

export default App;
