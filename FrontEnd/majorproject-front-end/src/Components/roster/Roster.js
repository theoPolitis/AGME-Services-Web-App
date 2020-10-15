import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Roster extends Component{


    constructor(props)
    {
        super(props);
        const { user } = props;
        if (user.admin) {
            this.state = {
                loading: true
            };
        } else {
            this.state = {
                roster: user.roster
            };
        }
    }

    componentDidMount() {
        if (this.props.user.admin) {
            this.fetchEmployeeRoster();
        }
    }

    hasChangeRequests = (roster) => {
        var sunCheck = roster.sunday !== roster.requestedSunday;
        var monCheck = roster.monday !== roster.requestedMonday;
        var tuesCheck = roster.tuesday !== roster.requestedTuesday;
        var wedCheck = roster.wednesday !== roster.requestedWednesday;
        var thursCheck = roster.thursday !== roster.requestedThursday;
        var friCheck = roster.friday !== roster.requestedFriday;
        var satCheck = roster.saturday !== roster.requestedSaturday;

        return (sunCheck || monCheck || tuesCheck || wedCheck || thursCheck || friCheck || satCheck)
    }

    fetchEmployeeRoster = () => {
        Axios.get("http://localhost:8080/api/employee/all/" + this.props.user.serviceNo, {}).then(
            (res) => {
                const rosters = res.data.filter(({ employeeId }) => employeeId !== this.props.user.employeeId).map(({ roster }) => roster);
                this.setState({ rosters, loading: false });
                console.log(rosters)
            }
        ).catch(
            (error) => {
                console.log(error);
                alert("An error occured");
            }
        );
    }

    submitData = () =>
    {
        var rost = this.state.roster;
        rost.isApproved = false;
        this.setState({roster: rost}, this.submit())
    }

    submit = () =>
    {
        this.setState({roster: {...this.state.roster, isApproved : false}}, this.sendRequest())
    }

    sendRequest = () => 
    {
        Axios.put("http://localhost:8080/api/roster/update",this.state.roster).then((res) => {
            
                if(this.state.roster.isApproved)
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

    approveOrReject = (index, isApproved) => {
        const newRoster = { ...this.state.rosters[index], isApproved }
        if (isApproved) {
            newRoster.sunday = newRoster.requestedSunday
            newRoster.monday = newRoster.requestedMonday
            newRoster.tuesday = newRoster.requestedTuesday
            newRoster.wednesday = newRoster.requestedWednesday
            newRoster.thursday = newRoster.requestedThursday
            newRoster.friday = newRoster.requestedFriday
            newRoster.saturday = newRoster.requestedSaturday
        }
        else{
            newRoster.requestedSunday = newRoster.sunday
            newRoster.requestedMonday = newRoster.monday
            newRoster.requestedTuesday = newRoster.tuesday
            newRoster.requestedWednesday = newRoster.wednesday
            newRoster.requestedThursday = newRoster.thursday
            newRoster.requestedFriday = newRoster.friday
            newRoster.requestedSaturday = newRoster.saturday
        }
        const newRosters = this.state.rosters.slice();
        newRosters[index] = newRoster;
        this.setState({rosters: newRosters}, () => {
            Axios.put("http://localhost:8080/api/roster/update", this.state.rosters[index]).then((res) => {
                    if(this.state.rosters[index].isApproved)
                    {
                        alert("You approved, your roster is up to date.");
                    }else{
                        alert("You rejected.");
                    }
                    
                  }).catch((error) => {
                    console.log(error);
                    alert("An error occured, you could not approve or reject");
                  })
        })
    }

    render() 
    {
        const { roster, rosters = [], loading } = this.state;
        if (this.props.loggedInStatus === "LOGGED_IN" )
        {
            if (this.props.user.admin) {
                return rosters.map((roster, index) => (
                    <div key={roster.id} className="container">
                        <h1>Employee Id: {roster.employee}</h1>
                        <div>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <div className="row" key={day}>
                                    <div className="day-admin">
                                        <h2>{day}: </h2>
                                        <span style={{color: "#2197DA"}}>{roster[day.toLowerCase()] ? " Rostered" : " Not Rostered"}</span>
                                        {roster[day.toLowerCase()] !== roster['requested' + day] && (
                                            <span style={{color: "#2197DA"}}>Request{roster['requested' + day] ? " Rostered" : " Not Rostered"}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {roster.isApproved || (
                            <div>
                                <button style={buttonMatchStyle} onClick={() => this.approveOrReject(index, true)}>
                                    Approve
                                </button>
                                <button style={buttonNotMatchStyle} onClick={() => this.approveOrReject(index, false)}>
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ));
            } else {
                return (
                    <div className="container">
                        <h1>Current Roster</h1>
                        <div>
                        <div className="row">
                            <div className="day">
                            <h2>Sunday:<span style={{color: "#2197DA", float:"right"}}>{roster.sunday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>
                            <button className="button" 
                            style={ roster.sunday === roster.requestedSunday ? buttonMatchStyle : buttonNotMatchStyle}
                            onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedSunday: !roster.requestedSunday}})
                            }}>
                                {roster.sunday === roster.requestedSunday ? "Approved" : "Change Requested"}
                            </button>
                        </div>

                        <div className="row">
                            <div className="day">
                            <h2>Monday:<span style={{color: "#2197DA", float:"right"}}>{roster.monday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>

                            <button className="button" style={ roster.monday === roster.requestedMonday ? buttonMatchStyle : buttonNotMatchStyle}
                            onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedMonday: !roster.requestedMonday}})
                            }}>
                                {roster.monday === roster.requestedMonday ? "Approved" : "Change Requested"}
                            </button>
                        </div>

                        <div className="row">
                            <div className="day">
                            <h2>Tuesday:<span style={{color: "#2197DA", float:"right"}}>{roster.tuesday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>
                            <button className="button" 
                            style={ roster.tuesday === roster.requestedTuesday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedTuesday: !roster.requestedTuesday}})
                            }}>
                                {roster.tuesday === roster.requestedTuesday ? "Approved" : "Change Requested"}
                            </button>
                        </div>

                        <div className="row">
                            <div className="day">
                            <h2>Wednesday:<span style={{color: "#2197DA", float:"right"}}>{roster.wednesday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>

                            <button className="button" 
                            style={ roster.wednesday === roster.requestedWednesday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedWednesday: !roster.requestedWednesday}})
                            }}>
                                {roster.wednesday === roster.requestedWednesday ? "Approved" : "Change Requested"}
                            </button>
                        </div>

                        <div className="row">
                            <div className="day">
                            <h2>Thursday:<span style={{color: "#2197DA", float:"right"}}>{roster.thursday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>

                            <button className="button" 
                            style={ roster.thursday === roster.requestedThursday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedThursday: !roster.requestedThursday}})
                            }}>
                                {roster.thursday === roster.requestedThursday ? "Approved" : "Change Requested"}
                            </button>
                        </div>

                        <div className="row">
                            <div className="day">
                            <h2>Friday:<span style={{color: "#2197DA", float:"right"}}>{roster.friday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>

                            <button className="button" 
                            style={ roster.friday === roster.requestedFriday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedFriday: !roster.requestedFriday}})
                            }}>
                                {roster.friday === roster.requestedFriday ? "Approved" : "Change Requested"}
                            </button>
                        </div>
                        <div className="row">
                            <div className="day">
                            <h2>Saturday:<span style={{color: "#2197DA", float:"right"}}>{roster.saturday ? " Rostered" : " Not Rostered"}</span></h2>
                            </div>

                            <button className="button" 
                            style={ roster.saturday === roster.requestedSaturday ? buttonMatchStyle : buttonNotMatchStyle} onClick = {() => {
                                this.setState({roster: {...this.state.roster, requestedSaturday: !roster.requestedSaturday}})
                            }}>
                                {roster.saturday === roster.requestedSaturday ? "Approved" : "Change Requested"}
                            </button>
                        </div>
                        {this.hasChangeRequests(roster) && (
                            <button className="submit_button" onClick={this.submitData}>Submit</button>
                        )}
                        </div>
                    </div>
                )
            }
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