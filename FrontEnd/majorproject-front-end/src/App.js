import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Employee from "./Components/employee/Employee";
import Header from "./Components/layout/Header.js";
import HomePage from "./Components/homepage/HomePage";
import Signup from "./Components/account/Signup.js";
import Login from "./Components/account/Login.js";
import StaffLogin from "./Components/account/StaffLogin";
import Booking from "./Components/booking/Booking";
import AboutUs from "./Components/aboutUs/AboutUs"
import Customer from "./Components/customer/Customer";
import AccountEdit from "./Components/account/AccountEdit"
import PasswordChange from "./Components/account/PasswordChange"
import Roster from "./Components/roster/Roster";
import Analytics from "./Components/analytics/Analytics";

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
      loggedInStatus: "LOGGED_IN"
    })
  }

  employeeAuth = (data) => {
    this.setState({
      user: data,
      employee: true,
      loggedInStatus: "LOGGED_IN"
    })
  }
  
  toggleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      customer: false,
      employee: false,
      user: {}
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header toggleLogout={this.toggleLogout} 
                  customer={this.state.customer} 
                  employee={this.state.employee} 
                   />

          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage {...props} 
                        loggedInStatus={this.state.loggedInStatus} />
            )}
          />

          <Route exact path="/aboutus" component={AboutUs}/>

          <Route exact path="/roster" render={(props) =>(<Roster {...props} user={this.state.user} customerAuth={this.customerAuth} loggedInStatus = {this.state.loggedInStatus}/>)}></Route>

          <Route exact path="/analytics" render={(props) =>(<Analytics {...props} user={this.state.user} customerAuth={this.customerAuth} loggedInStatus = {this.state.loggedInStatus}/>)}></Route>

          <Route
            path="/login"
            render={(props) => (
              <Login {...props} 
                     customerAuth={this.customerAuth} 
                     loggedInStatus={this.state.loggedInStatus} />
            )}
          />

          <Route
            path="/createAccount"
            render={(props) => (
              <Signup {...props} 
                      loggedInStatus={this.state.loggedInStatus} />
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
              <Booking {...props} 
                       loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>
            )}
          />

          <Route
            path="/customer"
            render={(props) => (
              <Customer {...props} 
                        loggedInStatus={this.state.loggedInStatus}
                        userAuth={this.state.user} 
                        customer={this.state.customer}/>
            )}
          />

          <Route
          path="/editDetails"
          render={(props) => (
            <AccountEdit {...props} 
                      loggedInStatus={this.state.loggedInStatus} 
                      currentCustomer={this.state.user}/>
          )}
        />

        <Route
        path="/changePassword"
        render={(props) => (
          <PasswordChange {...props} 
                    loggedInStatus={this.state.loggedInStatus} 
                    currentCustomer={this.state.user}/>
        )}
      />

          <Route
            path="/employee"
            render={(props) => (
              <Employee {...props}
                        loggedInStatus={this.state.loggedInStatus}
                        userAuth={this.state.user}
                        employee={this.state.employee}
                        customer={this.state.customer} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
