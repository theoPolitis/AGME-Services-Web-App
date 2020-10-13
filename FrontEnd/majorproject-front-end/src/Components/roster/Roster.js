import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Roster extends Component{


    constructor(props)
    {
        super(props);
        this.state = props.user.roster;
        console.log(props.user);
    }

    submitData = () =>
    {
        var sunCheck = this.state.sunday !== this.state.requestedSunday;
        var monCheck = this.state.monday !== this.state.requestedMonday;
        var tuesCheck = this.state.tuesday !== this.state.requestedTuesday;
        var wedCheck = this.state.wednesday !== this.state.requestedWednesday;
        var thursCheck = this.state.thursday !== this.state.requestedThursday;
        var friCheck = this.state.friday !== this.state.requestedFriday;
        var satCheck = this.state.saturday !== this.state.requestedSaturday;
        if(sunCheck || monCheck || tuesCheck || wedCheck || thursCheck || friCheck || satCheck)
        {
            this.setState({isApproved : false}, this.sendRequest())
        }else if(!this.state.isApproved){
            this.setState({isApproved: true}, this.sendRequest())
        }else{
            alert("Roster already up to date.")
        }
    }

    sendRequest = () => 
    {
        Axios.put("http://localhost:8080/api/roster/update",this.state).then((res) => {
                if(this.state.isApproved)
                {
                    alert("Your request has been removed, your roster is up to date.");
                }else{
                    alert("Your submission was recieved and is awaiting approval.");
                }
                
              }).catch((error) => {
                console.log(error);
                alert("An error occured, you could not request these changes");
              })
    }
    

    render() 
    {
        if (this.props.loggedInStatus === "LOGGED_IN")
        {
            return (
                <div className="container">
                    <h1>Current Roster</h1>
                    <div>
                    <div className="row">
                        <div className="day">
                           <h2>Sunday:<span style={{color: "#2197DA", float:"right"}}>{this.state.sunday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>
                        <button className="button" 
                        style={ this.state.sunday === this.state.requestedSunday ? buttonMatchStyle : buttonNotMatchStyle}
                        onClick = {() => {
                            this.setState({requestedSunday: !this.state.requestedSunday})
                        }}>
                            {this.state.sunday === this.state.requestedSunday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Monday:<span style={{color: "#2197DA", float:"right"}}>{this.state.monday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>

                        <button className="button" style={ this.state.monday === this.state.requestedMonday ? buttonMatchStyle : buttonNotMatchStyle}
                        onClick = {() => {
                            this.setState({requestedMonday: !this.state.requestedMonday})
                        }}>
                            {this.state.monday === this.state.requestedMonday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Tuesday:<span style={{color: "#2197DA", float:"right"}}>{this.state.tuesday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>
                        <button className="button" 
                        style={ this.state.tuesday === this.state.requestedTuesday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                            this.setState({requestedTuesday: !this.state.requestedTuesday})
                        }}>
                            {this.state.tuesday === this.state.requestedTuesday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Wednesday:<span style={{color: "#2197DA", float:"right"}}>{this.state.wednesday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>

                        <button className="button" 
                        style={ this.state.wednesday === this.state.requestedWednesday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                            this.setState({requestedWednesday: !this.state.requestedWednesday})
                        }}>
                            {this.state.wednesday === this.state.requestedWednesday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Thursday:<span style={{color: "#2197DA", float:"right"}}>{this.state.thursday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>

                        <button className="button" 
                        style={ this.state.thursday === this.state.requestedThursday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                            this.setState({requestedThursday: !this.state.requestedThursday})
                        }}>
                            {this.state.thursday === this.state.requestedThursday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Friday:<span style={{color: "#2197DA", float:"right"}}>{this.state.friday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>

                        <button className="button" 
                        style={ this.state.friday === this.state.requestedFriday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                            this.setState({requestedFriday: !this.state.requestedFriday})
                        }}>
                            {this.state.friday === this.state.requestedFriday ? "Approved" : "Change Requested"}
                        </button>
                    </div>

                    <div className="row">
                        <div className="day">
                           <h2>Saturday:<span style={{color: "#2197DA", float:"right"}}>{this.state.saturday ? " Rostered" : " Not Rostered"}</span></h2>
                        </div>

                        <button className="button" 
                        style={ this.state.saturday === this.state.requestedSaturday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                            this.setState({requestedSaturday: !this.state.requestedSaturday})
                        }}>
                            {this.state.saturday === this.state.requestedSaturday ? "Approved" : "Change Requested"}
                        </button>
                    </div>
                    <button className="submit_button" onClick={() => this.submitData()}>Submit</button>
                    </div>
                </div>
            );
        }
        else{
            return <Redirect to={{ pathname: "/" }} />;
        }
    }

    
}

const buttonMatchStyle = {
    backgroundColor: "#4CAF50",
    width: "20%",
    fontSize: "15px",
    height:"30px",
    borderRadius: "15px",
    cursor: "pointer",
    display: "inline-block"
}
const buttonNotMatchStyle = {
    backgroundColor: "#f44336",
    fontSize: "15px",
    width: "20%",
    height:"30px",
    borderRadius: "15px",
    cursor: "pointer",
    display: "inline-block"
}

export default Roster;