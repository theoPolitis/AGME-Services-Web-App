import React, { Component } from 'react'
import './Customer.css';

class Customer extends Component {

    constructor(){

        super();

        var bookings = [
            [
                'Dulshan','Kodithuwakku','12,savichi st, elephant','s3813354@student.rmit.edu.au','0405611615','Dulshank','12345A'
            ],
            [
                'Elias','Sembol','12,savichi st, elephant','s3813354@student.rmit.edu.au','0405611615','Dulshank','12345B'
            ]
        ];

        // state = {
        //     bookings: [
        //         {
        //             firstName:'Dulshan',
        //             lastName:'Kodithuwakku',
        //             address:'12,savichi st, elephant',
        //             email:'s3813354@student.rmit.edu.au',
        //             mobile:'0405611615',
        //             userName:'Dulshank',
        //             password:'12345A'
    
        //         },
        //         {
        //             firstName:'Elias',
        //             lastName:'Sembol',
        //             address:'12,savichi st, elephant',
        //             email:'s3813354@student.rmit.edu.au',
        //             mobile:'0405611615',
        //             userName:'Dulshank',
        //             password:'12345B'
    
        //         }
        //     ]
        // }
    }

    

    // state = {
    //     bookings: [
    //         {
    //             firstName:'Dulshan',
    //             lastName:'Kodithuwakku',
    //             address:'12,savichi st, elephant',
    //             email:'s3813354@student.rmit.edu.au',
    //             mobile:'0405611615',
    //             userName:'Dulshank',
    //             password:'12345A'

    //         },
    //         {
    //             firstName:'Elias',
    //             lastName:'Sembol',
    //             address:'12,savichi st, elephant',
    //             email:'s3813354@student.rmit.edu.au',
    //             mobile:'0405611615',
    //             userName:'Dulshank',
    //             password:'12345B'

    //         }
    //     ]
    // }

    handleSubmit(event) {

    }

    render() {
        return(

            <div>
            
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
                <h1 className="Logo">UIServices</h1>
                <div className="Links">
                    <a className="Services">Services</a>
                    <a className="Staff_Login">Staff Login</a>
                    <a className="Login">Login</a>
                    <a className="Button_Background"></a>
                    <a className="Register">Register</a>
                </div>
                
                <h1 className="BookingsTitle"> My Bookings </h1>

                <div className="Bookings">
                    
                </div>



           </div>
        )
    }
}
export default Customer;
