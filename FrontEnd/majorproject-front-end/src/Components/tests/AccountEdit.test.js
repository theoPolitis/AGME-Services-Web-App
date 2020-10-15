import React from "react";
import Login from "../account/Login";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import expect from 'expect'
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";

import AccountEdit from "../account/AccountEdit";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

beforeEach(() => {
    axios.get.mockImplementation((url) => {
      var baseUrl = "http://3.237.224.176:8080/api";
      switch (url) {
        case baseUrl + "/customer/1TP/":
          return Promise.resolve({
            data: [
              {
                id: 1,
                identificationNumber: "1TP",
                password: "theo",
                email: "s3661671@student.rmit.edu.au",
                firstName: "Theo",
                lastName: "Politis",
                address: "Something",
                phoneNumber: "4545574654",
                username: "Theo",
                createdDate: "2020-09-19",
                updatedDate: null,
                customerList: []
              },
            ],
          });
      }
    });
  });

describe("<AccountEdit /> test for AccountEdit.js and it's components", () => {

    it("Testing page will not load if user is not logged in", async () => {
        let customer;

        customer = {
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
            updatedDate: null
        }

        const wrapper = shallow(<AccountEdit currentCustomer={customer} />);
        // const instance = wrapper.instance();
        // var data = await wrapper.instance().componentDidMount();

        // const data = await wrapper.instance().componentDidMount();

        wrapper.setProps({loggedInStatus: "NOT_LOGGED_IN"});

        expect(wrapper.containsMatchingElement(<h1 name="noUser" className="noUser">You must be logged in to use this feature</h1>)).toEqual(true);
        // expect(wrapper.find(".noUser")).to.have.lengthOf(1);
        // expect(wrapper.find(".noUser"));
    });

    it("Testing page will load if user is logged in", async () => {
      let customer;
      
        customer = {
          id: 1,
          identificationNumber: "1TP",
          password: "theo",
          email: "s3661671@student.rmit.edu.au",
          firstName: "Theo",
          lastName: "Politis",
          address: "Something",
          phoneNumber: "4545574654",
          username: "Theo",
          createdDate: "2020-09-19",
          updatedDate: null
        }

        const wrapper = shallow(<AccountEdit currentCustomer={customer} />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});

        expect(wrapper.containsMatchingElement(<h1 name="noUser" className="noUser">You must be logged in to use this feature</h1>)).toEqual(false);
        
    });

    it('First Name change of state check', async () => {
      let customer;
      
      customer = {
        id: 1,
        identificationNumber: "1TP",
        password: "theo",
        email: "s3661671@student.rmit.edu.au",
        firstName: "Theo",
        lastName: "Politis",
        address: "Something",
        phoneNumber: "4545574654",
        username: "Theo",
        createdDate: "2020-09-19",
        updatedDate: null
      }

      const wrapper = shallow(<AccountEdit currentCustomer={customer} />);

      expect(wrapper.state('firstName')).toEqual('Theo')
  
      wrapper.find('input[name="firstName"]').simulate('change', {
          target: {
              name: 'firstName',
              value: 'Adam'
          }
      });
  
      expect(wrapper.state('firstName')).toEqual('Adam')
  })

  it('Last Name change of state check', async () => {
    let customer;
    
    customer = {
      id: 1,
      identificationNumber: "1TP",
      password: "theo",
      email: "s3661671@student.rmit.edu.au",
      firstName: "Theo",
      lastName: "Politis",
      address: "Something",
      phoneNumber: "4545574654",
      username: "Theo",
      createdDate: "2020-09-19",
      updatedDate: null
    }

    const wrapper = shallow(<AccountEdit currentCustomer={customer} />);

    expect(wrapper.state('lastName')).toEqual('Politis')

    wrapper.find('input[name="lastName"]').simulate('change', {
        target: {
            name: 'lastName',
            value: 'Smith'
        }
    });

    expect(wrapper.state('lastName')).toEqual('Smith')
})

it('Email change of state check', async () => {
  let customer;
  
  customer = {
    id: 1,
    identificationNumber: "1TP",
    password: "theo",
    email: "s3661671@student.rmit.edu.au",
    firstName: "Theo",
    lastName: "Politis",
    address: "Something",
    phoneNumber: "4545574654",
    username: "Theo",
    createdDate: "2020-09-19",
    updatedDate: null
  }

  const wrapper = shallow(<AccountEdit currentCustomer={customer} />);

  expect(wrapper.state('email')).toEqual('s3661671@student.rmit.edu.au')

  wrapper.find('input[name="email"]').simulate('change', {
      target: {
          name: 'email',
          value: 'somethingElse@email.com'
      }
  });

  expect(wrapper.state('email')).toEqual('somethingElse@email.com')
})

it('Phone Number change of state check', async () => {
  let customer;
  
  customer = {
    id: 1,
    identificationNumber: "1TP",
    password: "theo",
    email: "s3661671@student.rmit.edu.au",
    firstName: "Theo",
    lastName: "Politis",
    address: "Something",
    phoneNumber: "4545574654",
    username: "Theo",
    createdDate: "2020-09-19",
    updatedDate: null
  }

  const wrapper = shallow(<AccountEdit currentCustomer={customer} />);

  expect(wrapper.state('phoneNumber')).toEqual('4545574654')

  wrapper.find('input[name="phoneNumber"]').simulate('change', {
      target: {
          name: 'phoneNumber',
          value: '0412112112'
      }
  });

  expect(wrapper.state('phoneNumber')).toEqual('0412112112')
})

it('Address change of state check', async () => {
  let customer;
  
  customer = {
    id: 1,
    identificationNumber: "1TP",
    password: "theo",
    email: "s3661671@student.rmit.edu.au",
    firstName: "Theo",
    lastName: "Politis",
    address: "Something",
    phoneNumber: "4545574654",
    username: "Theo",
    createdDate: "2020-09-19",
    updatedDate: null
  }

  const wrapper = shallow(<AccountEdit currentCustomer={customer} />);

  expect(wrapper.state('address')).toEqual('Something')

  wrapper.find('input[name="address"]').simulate('change', {
      target: {
          name: 'address',
          value: '123 No where street'
      }
  });

  expect(wrapper.state('address')).toEqual('123 No where street')
})


});