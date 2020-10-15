import React from "react";
import Login from "../account/Login";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import expect from 'expect'
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";

import PasswordChange from "../account/PasswordChange";

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

describe("<PasswordChange /> test for PasswordChange.js and it's components", () => {

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

        const wrapper = shallow(<PasswordChange currentCustomer={customer} />);

        wrapper.setProps({loggedInStatus: "NOT_LOGGED_IN"});

        expect(wrapper.containsMatchingElement(<h1>You must be logged in to use this feature</h1>)).toEqual(true);
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

        const wrapper = shallow(<PasswordChange currentCustomer={customer} />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});

        expect(wrapper.containsMatchingElement(<h1>You must be logged in to use this feature</h1>)).toEqual(false);
        
    });

    it('Old password change of state check', async () => {
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
    
      const wrapper = shallow(<PasswordChange currentCustomer={customer} />);
    
      expect(wrapper.state('oldPassword')).toEqual('')
    
      wrapper.find('input[name="oldPassword"]').simulate('change', {
          target: {
              name: 'oldPassword',
              value: 'newpass'
          }
      });
    
      expect(wrapper.state('oldPassword')).toEqual('newpass')
    })

    it('New password change of state check', async () => {
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
    
      const wrapper = shallow(<PasswordChange currentCustomer={customer} />);
    
      expect(wrapper.state('newPassword')).toEqual('')
    
      wrapper.find('input[name="newPassword"]').simulate('change', {
          target: {
              name: 'newPassword',
              value: 'newpass'
          }
      });
    
      expect(wrapper.state('newPassword')).toEqual('newpass')
    })

    it('Confirm password change of state check', async () => {
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
    
      const wrapper = shallow(<PasswordChange currentCustomer={customer} />);
    
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