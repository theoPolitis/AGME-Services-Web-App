import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Customer from './Components/Customer/Customer.js';
import Header from './Components/layout/Header.js';
import HomePage from './Components/homepage/HomePage';
import Signup from './Components/account/Signup.js';
import Login from './Components/account/Login.js';
import StaffLogin from './Components/account/StaffLogin';
import Booking from './Components/booking/Booking';

 class App extends React.Component {
   constructor(){
     super()
     this.state = {
       //this will boolean at some point but can change later 
       loggedInStatus: "NOT_LOGGED_IN",
       employee: false,
       customer: true,
       user:{}

     }
   }

   render() {
     return (
       <Router>
          <div>
            <Header loggedInStatus={this.state.loggedInStatus}/>
            
            <Route exact path="/" render={props => (
              <HomePage {...props} loggedInStatus={this.state.loggedInStatus} />
            )}/>

            <Route path="/login" render={props => (
              <Login {...props} loggedInStatus={this.state.loggedInStatus}/>
            )} />

            <Route path='/createAccount' render={props => (
              <Signup {...props} loggedInStatus={this.state.loggedInStatus}/>
            )} />

            <Route path='/staffLogin' render={props => (
              <StaffLogin {...props} loggedInStatus={this.state.loggedInStatus} />
            )} />

            <Route path="/booking" render={props => (
              <Booking {...props} loggedInStatus={this.state.loggedInStatus} />
            )} />

          </div>
       </Router>
     )
   }
 }

 export default App;
 
