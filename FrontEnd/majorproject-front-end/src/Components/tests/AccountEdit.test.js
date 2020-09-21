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
      var baseUrl = "http://localhost:8080/api";
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
});