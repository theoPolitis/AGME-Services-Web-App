import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './Components/layout/Header.js';
import HomePage from './Components/homepage/HomePage';
import Signup from './Components/account/Signup.js';
import Login from './Components/account/Login.js';

 export default class App extends React.Component {
   render() {
     return (
       <Router>
          <div>
            <Header/>
            <Route exact path="/" component={HomePage} />
            <Route path='/createAccount' component={Signup}/>
            <Route path='/login' component={Login}/>
          </div>
       </Router>
     )
   }
 }
 
