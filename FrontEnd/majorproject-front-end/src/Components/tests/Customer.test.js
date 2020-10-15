import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
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
    }
  });
});

describe("<Customer /> test for Customer.js and it's components", () => {
  it("Testing user firstName", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);


    wrapper.find('label[name="firstName"]').equals("change", {
      target: {
        name: "firstName",
        value: "Alocious",
      },
    });
  });

  it("Testing user lastName", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);

    wrapper.find('label[name="lastName"]').equals("change", {
      target: {
        name: "lastName",
        value: "Kronos",
      },
    });
  });

  it("Testing user address", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);

    wrapper.find('label[name="address"]').equals("change", {
      target: {
        name: "address",
        value: "20 mongol street, eliot",
      },
    });
  });

  it("Testing user email", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);

    wrapper.find('label[name="email"]').equals("change", {
      target: {
        name: "email",
        value: "alichan@email.com",
      },
    });
  });

  it("Testing user phoneNumber", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);

    wrapper.find('label[name="mobileNumber"]').equals("change", {
      target: {
        name: "mobileNumber",
        value: "0405811816",
      },
    });
  });

  it("Testing user userName", async () => {
    const auth = [
      {
        firstName: "Alocious",
        Address: "20 mongol street, eliot",
        email: "alichan@email.com",
        lastName: "Kronos",
        phoneNumber: "0405811816",
        userName: "Alocious",
      },
    ];

    const wrapper = shallow(<Customer userAuth={auth} />);

    wrapper.find('label[name="userName"]').equals("change", {
      target: {
        name: "userName",
        value: "Alocious",
      },
    });
  });
});
