import React, { Component } from 'react'
import '../homepage/HomePage.css'
import './Booking.css';
class Booking extends Component {

    handleSubmit(event) 
    {

    }

    render() {
        return (
           <body>
                <main>
                        <h1 className = "BookingTitle">Make A Booking</h1>
                            <form onSubmit={this.handleSubmit}>

                                <div className="Service">
                                    <label className="ServiceLabel">
                                        Service:
                                    </label>
                                    <input type="text" className="ServiceInput">

                                    </input>
                                </div>

                                <div className="Employee">
                                    <label className="EmployeeLabel">
                                        Employee:
                                    </label>
                                    <input type="date" className="EmployeeInput">

                                    </input>
                                </div>

                                <div className="BookingDate">
                                    <label className="BookingDateLabel">
                                        Booking Date:
                                    </label>
                                    <input type="date" className="BookingDateInput">

                                    </input>
                                </div>

                                <div className="BookingTime">
                                    <label className="BookingTimeLabel">
                                        Booking Time:
                                    </label>
                                    <input type="text" className="BookingTimeInput">

                                    </input>
                                </div>
                                <input className = "Button"type="submit" value="Submit"/>
                            </form>
                    
                </main>
           </body>
        )
    }
}
export default Booking;
