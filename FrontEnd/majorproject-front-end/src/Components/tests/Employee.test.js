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
      case baseUrl + "/customer/1TP/":
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
