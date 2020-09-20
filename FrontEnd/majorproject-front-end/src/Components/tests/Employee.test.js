import React from "react";
import Login from "../account/Login";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";
import Booking from "../booking/Booking";
import Employee from "../Employee/Employee";

jest.mock("axios");

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    var baseUrl = "http://localhost:8080/api";
    switch (url) {
      case baseUrl + "/employee/E1234/":
        return Promise.resolve({
          data: [
            {
              employeeId: 7,
              employeeIdentifier: "E1234",
              firstName: "Alex",
              lastName: "Test",
              address: "Something",
              email: "s3661671@student.rmit.edu.au",
              phoneNumber: 72596109,
              password: "alex",
              userName: "Alex",
              createdDate: "2020-09-20",
              updatedDate: null,
              rosterList: [],
              bookingList: [],
              admin: false,
            },
          ],
        });
      case baseUrl + "/employee/E2341/":
        return Promise.resolve({
          data: [
            {
              employeeId: 8,
              employeeIdentifier: "E2341",
              firstName: "Admin",
              lastName: "Admin",
              address: "admin",
              email: "admin@student.rmit.edu.au",
              phoneNumber: 0,
              password: "admin",
              userName: "Admin",
              createdDate: "2020-09-20",
              updatedDate: null,
              rosterList: [],
              bookingList: [],
              admin: true,
            },
          ],
        });
    }
  });
});

describe("<Employee /> test for Employee.js and it's components", () => {
  //do the employee testing here
  it("Testing the firstName", async () => {
    const auth = [
      {
        firstName: "Alex",
        Address: "10 mongol street, eliot",
        email: "alexchan@email.com",
        lastName: "chan",
        phoneNumber: "0405811815",
        userName: "Alex",
      },
    ];

    const wrapper = shallow(<Employee userAuth={auth} />);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="firstname"]').equals("change", {
      target: {
        name: "firstname",
        value: "Alex",
      },
    });
  });

  it("Testing the lastName", async () => {
    const auth = [
      {
        firstName: "Alex",
        Address: "10 mongol street, eliot",
        email: "alexchan@email.com",
        lastName: "chan",
        phoneNumber: "0405811815",
        userName: "Alex",
      },
    ];

    const wrapper = shallow(<Employee userAuth={auth} />);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="lastname"]').equals("change", {
      target: {
        name: "lastname",
        value: "chan",
      },
    });
  });

  it("Testing the email", async () => {
    const auth = [
      {
        firstName: "Alex",
        Address: "10 mongol street, eliot",
        email: "alexchan@email.com",
        lastName: "chan",
        phoneNumber: "0405811815",
        userName: "Alex",
      },
    ];

    const wrapper = shallow(<Employee userAuth={auth} />);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="email"]').equals("change", {
      target: {
        name: "email",
        value: "alexchan@email.com",
      },
    });
  });

  it("Testing the address", async () => {
    const auth = [
      {
        firstName: "Alex",
        Address: "10 mongol street, eliot",
        email: "alexchan@email.com",
        lastName: "chan",
        phoneNumber: "0405811815",
        userName: "Alex",
      },
    ];

    const wrapper = shallow(<Employee userAuth={auth} />);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="address"]').equals("change", {
      target: {
        name: "address",
        value: "10 mongol street, eliot",
      },
    });
  });

  it("Testing the mobilenumber", async () => {
    const auth = [
      {
        firstName: "Alex",
        Address: "10 mongol street, eliot",
        email: "alexchan@email.com",
        lastName: "chan",
        phoneNumber: "0405811815",
        userName: "Alex",
      },
    ];

    const wrapper = shallow(<Employee userAuth={auth} />);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="mobilenumber"]').equals("change", {
      target: {
        name: "mobilenumber",
        value: "0405811815",
      },
    });
  });
});
