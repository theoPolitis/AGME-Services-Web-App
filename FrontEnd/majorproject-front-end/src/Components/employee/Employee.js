import React, { Component } from 'react'
import './Employee.css';
import '../account/Account.css'


class Employee extends Component {
    constructor(props) {
        super(props);
        

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {}

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    

    render() {
        var jobs = [
            ["1", "Date: 20/10/2020", "- Time: 10.00am"],
            ["1", "Date: 22/10/2020", "- Time: 12.00am"],
            ["1", "Date: 24/10/2020", "- Time: 1.00pm"],
            ["1", "Date: 25/10/2020", "- Time: 3.00pm"],
            ["1", "Date: 26/10/2020", "- Time: 4.00pm"],
            ["1", "Date: 27/10/2020", "- Time: 5.00pm"],
          ];
      
          var jobsDisplayArray = jobs.map((index) => (
            <p>{index[1] + " " + index[2] + " "}</p>
          ));


        return (
                
             <div className="container">

           <h1>Employee</h1>
           <h1>Rosrer</h1>
       

         {/* the things should loop here but i have no idea how to do it */}
           <ul className="Jobs">{jobsDisplayArray}</ul>


           <button className="doneBtn" name="Done">
          Done
        </button>

        <p className="SpecialInstructions">
          *select the job and then click on Done when you complete it 
        </p> 

        <h1>Details</h1>

<form onSubmit={this.handleSubmit}>

    <div className="row">
        <div className="col-1">
            <label>
                First Name:
            </label>
        </div>
        <div className="col-2">
            <input type="text" name="firstname"/>
        </div>
    </div>

    <div className="row">
        <div className="col-1">
            <label>
                Last Name:
            </label>
        </div>
        <div className="col-2">
            <input type="text" name="lastname"/>
        </div>
    </div>

    <div className="row">
        <div className="col-1">
            <label>
                Email:
            </label>
        </div>
        <div className="col-2">
            <input type="text" name="email"/>
        </div>
    </div>

    <div className="row">
        <div className="col-1">
            <label>
                Address:
            </label>
        </div>
        <div className="col-2">
            <input type="text" name="address"/>
        </div>
    </div>

    <div className="row">
        <div className="col-1">
            <label>
                Mobile Number:
            </label>
        </div>
        <div className="col-2">
            <input type="text" name="username"/>
        </div>
    </div>

    <div className="row">
        <div className="col-1">
            <label>
                Password:
            </label>
        </div>
        <div className="col-2">
            <input type="password" name="password"/>
        </div>
    </div>

    

    <input type="submit" value="Submit"/>
</form>

          
            </div>

        )
    }
}

export default Employee;

