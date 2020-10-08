import React, { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import Axios from "axios";
const Plot = createPlotlyComponent(Plotly);


class Analytics extends Component{

    constructor(props){
        super(props);
        this.state = {};
        Axios.get("http://localhost:8080/api/employee/all/"+props.user.serviceNo, {}).then(
            (res) => {this.setState({employees: res.data},this.populateRoster(res.data))}
        ).catch(
            (error) => {
                console.log(error);
                alert("An error occured");
            }
        );
    }

    populateRoster = (employees) => {
        var roster = employees.map((employee) => (employee.roster));
        this.setState({rosters:roster});
        var numAvailable = [0,0,0,0,0,0,0];
        var i;
        for(i=0; i<roster.length;i++)
        {
            var rost = roster[i];
            if(rost.sunday)
            {
                numAvailable[0] +=1;
            }
            if(rost.monday)
            {
                numAvailable[1] +=1;
            }
            if(rost.tuesday)
            {
                numAvailable[2] +=1;
            }
            if(rost.wednesday)
            {
                numAvailable[3] +=1;
            }
            if(rost.thursday)
            {
                numAvailable[4] +=1;
            }
            if(rost.friday)
            {
                numAvailable[5] +=1;
            }
            if(rost.saturday)
            {
                numAvailable[6] +=1;
            }
        }
        console.log(numAvailable);
        this.setState({rosterNumbers: numAvailable});
    } 


    render() {
        return(
            <Plot
        data={[
          {
            x: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            y: this.state.rosterNumbers,
            type: 'bar'
          }
        ]}
        layout={ {width: 320, height: 240, title: 'Staff Availabilities'} }
      />
        );
    }
}
export default Analytics;