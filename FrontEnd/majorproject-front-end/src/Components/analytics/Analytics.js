import React, { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import { Redirect } from "react-router-dom";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);


class Analytics extends Component {

    constructor(props) {
        super(props);
        console.log(props.bookingInfo.length);
        var totalBookings = [0,0,0,0,0,0,0,0];
        for(var i = 0; i < props.bookingInfo.length; i++)
        {
            var custBookings = props.bookingInfo[i].dates;
            for(var j = 0; j < custBookings.length; j++)
            {
                totalBookings[j] += custBookings[j];
            }
        }
        this.state = {
            totalBookings: totalBookings
        };

    }

    plotData = () =>{
        var data = [];
        for(var i = 0; i < this.props.bookingInfo.length; i++)
        {
            data.push(
            <div>
                <Plot 
                    data={[
                        {
                            x: this.props.dates,
                            y: this.props.bookingInfo[i].dates,
                            type: 'scatter',
                        }
                    ]}
                    layout={{ 
                        width:"100%", 
                        height: 300, 
                        title: "Total Bookings For " + this.props.bookingInfo[i].name + " This Week",
                        font: {
                            family: 'Lato',
                            size: 14,
                            color: '#2197da'
                        },
                        plot_bgcolor: "black",
                        paper_bgcolor: "black"

                    }} 
                />
            </div>
            );
            
        }
        return data;
    }

    render() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            return (
                <div className="container">
                    <h1>Analytics</h1>
                    <div style={{width:"100%",margin:"auto"}}>
                        <Plot
                            data={[
                                {
                                    x: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                    y: this.props.rosterInfo,
                                    type: 'bar'
                                }
                            ]}
                            layout={{ 
                                width:"100%", 
                                height: 300, 
                                title: 'Staff Availabilities',
                                font: {
                                    family: 'Lato',
                                    size: 14,
                                    color: '#2197da'
                                },
                                plot_bgcolor: "black",
                                paper_bgcolor: "black"
        
                            }} 
                        />
                    </div>
                    <div>
                        <Plot
                            data={[
                                {
                                    x: this.props.dates,
                                    y: this.state.totalBookings,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {
                                        color: "#2197da",
                                        width:8
                                    }
                                }
                            ]}
                            layout={{ 
                                width:"100%", 
                                height: 300, 
                                title: "Total Bookings This Week",
                                font: {
                                    family: 'Lato',
                                    size: 14,
                                    color: '#2197da'
                                },
                                plot_bgcolor: "black",
                                paper_bgcolor: "black"
        
                            }} 
                        />
                    </div>
                    {this.plotData()}
                </div>

            );
        } else {
            return <Redirect to={{ pathname: "/" }} />;
        }

    }
}
export default Analytics;