import React from "react";
import Login from "../account/Login";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import expect from 'expect'
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";

import EmployeeEdit from "../employee/EmployeeEdit";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

let adminAttribute;

beforeEach(() => {
    axios.get.mockImplementation((url) => {
      var baseUrl = "http://localhost:8080/api";
      switch (url) {
        case baseUrl + "/employee/E3456/":
          return Promise.resolve({
            data: [
                {
                    "employeeId": 11,
                    "employeeIdentifier": "E3456",
                    "firstName": "Samantha",
                    "lastName": "Eleven",
                    "address": "changed",
                    "email": "test@email.com",
                    "phoneNumber": "0344323143",
                    "password": "test",
                    "userName": "Sam",
                    "createdDate": "2020-10-13",
                    "updatedDate": "2020-10-13",
                    "roster": {
                      "id": 35,
                      "employee": 11,
                      "sunday": true,
                      "monday": true,
                      "tuesday": true,
                      "wednesday": true,
                      "thursday": true,
                      "friday": true,
                      "saturday": true,
                      "requestedSunday": true,
                      "requestedMonday": true,
                      "requestedTuesday": true,
                      "requestedWednesday": true,
                      "requestedThursday": true,
                      "requestedFriday": true,
                      "requestedSaturday": true,
                      "isApproved": true
                    },
                    "admin": false,
                    "serviceNo": "2E"
                  },
            ],
          });
      }
    });

    adminAttribute = {
        admin: true
    }
  });

describe("<EmployeeEdit /> test for EmployeeEdit.js and it's components", () => {

    it("Testing page will not load if user does not have admin privileges", async () => {
        let employee;

        employee = {
            id: null,
            identificationNumber: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            username: "",
            createdDate: "",
            updatedDate: null,
            admin: false
        }

        const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={employee} />);

        expect(wrapper.containsMatchingElement( <h1>You must be signed in with an Administrator account to access this feature.</h1>)).toEqual(true);
    });

    it("Testing page will load if user is an admin", async () => {
      let admin;
      
        admin = {
            "employeeId": 11,
            "employeeIdentifier": "E3456",
            "firstName": "Samantha",
            "lastName": "Eleven",
            "address": "changed",
            "email": "test@email.com",
            "phoneNumber": "0344323143",
            "password": "test",
            "userName": "Sam",
            "createdDate": "2020-10-13",
            "updatedDate": "2020-10-13"
        }

        const wrapper = shallow(<EmployeeEdit selectedEmployee={admin} userAuth={adminAttribute} />);

        expect(wrapper.containsMatchingElement( <h1>You must be signed in with an Administrator account to access this feature.</h1>)).toEqual(false);
        
    });

    it('First Name change of state check', async () => {
      let employee;
      
      employee = {
        "employeeId": 11,
        "employeeIdentifier": "E3456",
        "firstName": "Samantha",
        "lastName": "Eleven",
        "address": "changed",
        "email": "test@email.com",
        "phoneNumber": "0344323143",
        "password": "test",
        "userName": "Sam",
        "createdDate": "2020-10-13",
        "updatedDate": "2020-10-13"
      }

      const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);

      expect(wrapper.state('firstName')).toEqual('Samantha')
  
      wrapper.find('input[name="firstName"]').simulate('change', {
          target: {
              name: 'firstName',
              value: 'Adam'
          }
      });
  
      expect(wrapper.state('firstName')).toEqual('Adam')
  })

  it('Last Name change of state check', async () => {
    let employee;
    
    employee = {
        "employeeId": 11,
        "employeeIdentifier": "E3456",
        "firstName": "Samantha",
        "lastName": "Eleven",
        "address": "changed",
        "email": "test@email.com",
        "phoneNumber": "0344323143",
        "password": "test",
        "userName": "Sam",
        "createdDate": "2020-10-13",
        "updatedDate": "2020-10-13"
    }

    const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);

    expect(wrapper.state('lastName')).toEqual('Eleven')

    wrapper.find('input[name="lastName"]').simulate('change', {
        target: {
            name: 'lastName',
            value: 'Smith'
        }
    });

    expect(wrapper.state('lastName')).toEqual('Smith')
})

it('Email change of state check', async () => {
  let employee;
  
  employee = {
    "employeeId": 11,
    "employeeIdentifier": "E3456",
    "firstName": "Samantha",
    "lastName": "Eleven",
    "address": "changed",
    "email": "test@email.com",
    "phoneNumber": "0344323143",
    "password": "test",
    "userName": "Sam",
    "createdDate": "2020-10-13",
    "updatedDate": "2020-10-13"
  }

  const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);

  expect(wrapper.state('email')).toEqual('test@email.com')

  wrapper.find('input[name="email"]').simulate('change', {
      target: {
          name: 'email',
          value: 'somethingElse@email.com'
      }
  });

  expect(wrapper.state('email')).toEqual('somethingElse@email.com')
})

it('Phone Number change of state check', async () => {
  let employee;
  
  employee = {
    "employeeId": 11,
    "employeeIdentifier": "E3456",
    "firstName": "Samantha",
    "lastName": "Eleven",
    "address": "changed",
    "email": "test@email.com",
    "phoneNumber": "0344323143",
    "password": "test",
    "userName": "Sam",
    "createdDate": "2020-10-13",
    "updatedDate": "2020-10-13"
  }

  const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);

  expect(wrapper.state('phoneNumber')).toEqual('0344323143')

  wrapper.find('input[name="phoneNumber"]').simulate('change', {
      target: {
          name: 'phoneNumber',
          value: '0412112112'
      }
  });

  expect(wrapper.state('phoneNumber')).toEqual('0412112112')
})

it('Address change of state check', async () => {
  let employee;
  
  employee = {
    "employeeId": 11,
    "employeeIdentifier": "E3456",
    "firstName": "Samantha",
    "lastName": "Eleven",
    "address": "changed",
    "email": "test@email.com",
    "phoneNumber": "0344323143",
    "password": "test",
    "userName": "Sam",
    "createdDate": "2020-10-13",
    "updatedDate": "2020-10-13"
  }

  const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);

  expect(wrapper.state('address')).toEqual('changed')

  wrapper.find('input[name="address"]').simulate('change', {
      target: {
          name: 'address',
          value: '123 No where street'
      }
  });

  expect(wrapper.state('address')).toEqual('123 No where street')
})

it('Password change of state check', async () => {
    let employee;
    
    employee = {
        "employeeId": 11,
        "employeeIdentifier": "E3456",
        "firstName": "Samantha",
        "lastName": "Eleven",
        "address": "changed",
        "email": "test@email.com",
        "phoneNumber": "0344323143",
        "password": "test",
        "userName": "Sam",
        "createdDate": "2020-10-13",
        "updatedDate": "2020-10-13"
    }
  
    const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);
  
    expect(wrapper.state('password')).toEqual('')
  
    wrapper.find('input[name="password"]').simulate('change', {
        target: {
            name: 'password',
            value: 'newpass'
        }
    });
  
    expect(wrapper.state('password')).toEqual('newpass')
  })

  it('Confirm password change of state check', async () => {
    let employee;
    
    employee = {
        "employeeId": 11,
        "employeeIdentifier": "E3456",
        "firstName": "Samantha",
        "lastName": "Eleven",
        "address": "changed",
        "email": "test@email.com",
        "phoneNumber": "0344323143",
        "password": "test",
        "userName": "Sam",
        "createdDate": "2020-10-13",
        "updatedDate": "2020-10-13"
    }
  
    const wrapper = shallow(<EmployeeEdit selectedEmployee={employee} userAuth={adminAttribute} />);
  
    expect(wrapper.state('confirmPassword')).toEqual('')
  
    wrapper.find('input[name="confirmPassword"]').simulate('change', {
        target: {
            name: 'confirmPassword',
            value: 'newpass'
        }
    });
  
    expect(wrapper.state('confirmPassword')).toEqual('newpass')
  })


});