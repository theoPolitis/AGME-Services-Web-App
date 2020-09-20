import React from "react";
import Login from "../account/Login";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";
import Booking from "../booking/Booking";
import Customer from "../customer/Customer";

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
              customerList: [
                {
                  id: 17,
                  employee: {
                    employeeId: 9,
                    employeeIdentifier: "E3456",
                    firstName: "Sam",
                    lastName: "ten",
                    address: "10 the parade",
                    email: "sam@student.rmit.edu.au",
                    phoneNumber: 93542812,
                    password: "sam",
                    userName: "Sam",
                    createdDate: "2020-09-19",
                    updatedDate: null,
                    rosterList: [],
                    bookingList: [],
                    admin: false,
                  },
                  customer: 1,
                  serviceType: {
                    serviceNo: "3E",
                    serviceName: "Barber",
                    createdDate: "2020-09-19",
                    updatedDate: null,
                  },
                  rosterDate: "2020-09-19",
                  rosterTime: "17:22:39",
                  completed: false,
                },
              ],
            },
          ],
        });
      // case baseUrl+"/booking/"+"2020-10-31" + "/" + "E1234":
      //     return Promise.resolve({data: [
      //         {
      //             time: "11:00"
      //         }
      //     ]})
    }
  });
});

// const auth = [
//   {
//     firstName: "Alocious",
//     Address: "20 mongol street, eliot",
//     email: "alichan@email.com",
//     lastName: "Kronos",
//     phoneNumber: "0405811816",
//     userName: "Alocious",
//   },
// ];

describe("<Customer /> test for Customer.js and it's components", () => {
  it("Testing user firstName", async () => {
    const auth = [{
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      }];

    const wrapper = shallow(<Customer userAuth={auth}/>);
    const instance = wrapper.instance();

    var data = await wrapper.instance().componentDidMount();
    wrapper.find('input[name="firstName"]').equals("change", {
      target: {
        name: "firstName",
        value: "Alocious",
      },
    });
  });
});
