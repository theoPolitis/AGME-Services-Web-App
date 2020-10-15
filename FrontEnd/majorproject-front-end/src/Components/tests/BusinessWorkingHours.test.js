import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import renderWithRouter from "./TestingRouter";
import BusinessWorkingHours from "../account/BusinessWorkingHours";

jest.mock("axios");
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    axios.get.mockImplementation((url) => {
      var baseUrl = "http://3.237.224.176:8080/api";
      switch (url) {
        case baseUrl + "/serviceType/" + "1E":
            return Promise.resolve({
              data: [
                {
                  serviceNo: "1E",
                  serviceName: "Phresh Cutz",
                  createdDate: "2020-10-12",
                  updatedDate: null,
                  startTime: "08:00",
                  endTime: "20:00",
                },
              ],
            });
          case baseUrl + "/serviceType/" + "2E":
            return Promise.resolve({
              data: [
                {
                  serviceNo: "2E",
                  serviceName: "Gym",
                  createdDate: "2020-10-12",
                  updatedDate: null,
                  startTime: "08:00",
                  endTime: "20:00",
                },
              ],
            });
          case baseUrl + "/serviceType/" + "3E":
            return Promise.resolve({
              data: [
                {
                  serviceNo: "3E",
                  serviceName: "Barber",
                  createdDate: "2020-10-12",
                  updatedDate: null,
                  startTime: "08:00",
                  endTime: "20:00",
                },
              ],
            });
        }
    });
  });

describe("<BusinessWorkingHours /> test for BusinessWorkingHours.js and it's components", () => {

    it("Testing User redirected to staffLogin if not logged in as admin", async () => {

        let adminUser = [
            {
                employeeId: 9,
                employeeIdentifier: "E2351",
                firstName: "AdminGym",
                lastName: "AdminGym",
                address: "admin",
                email: "AdminGym@student.rmit.edu.au",
                phoneNumber: 0,
                password: "adminGym",
                userName: "AdminGym",
                createdDate: "2020-10-13",
                updatedDate: null,
                roster: {
                    id: 35,
                    employee: 9,
                    sunday: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    requestedSunday: true,
                    requestedMonday: true,
                    requestedTuesday: true,
                    requestedWednesday: true,
                    requestedThursday: true,
                    requestedFriday: true,
                    requestedSaturday: true,
                    isApproved: true
                },
                admin: false,
                serviceNo: "2E"
            },
            ];

        window.alert = jest.fn();
        const wrapper = shallow(<BusinessWorkingHours userAuth={adminUser}/>)
        const { history } = renderWithRouter(wrapper);
        expect(history.location.pathname).toEqual("/");
      });

    it("Testing current start Time", async () => {

        let adminUser = 
            {
                employeeId: 9,
                employeeIdentifier: "E2351",
                firstName: "AdminGym",
                lastName: "AdminGym",
                address: "admin",
                email: "AdminGym@student.rmit.edu.au",
                phoneNumber: 0,
                password: "adminGym",
                userName: "AdminGym",
                createdDate: "2020-10-13",
                updatedDate: null,
                roster: {
                    id: 35,
                    employee: 9,
                    sunday: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    requestedSunday: true,
                    requestedMonday: true,
                    requestedTuesday: true,
                    requestedWednesday: true,
                    requestedThursday: true,
                    requestedFriday: true,
                    requestedSaturday: true,
                    isApproved: true
                },
                admin: true,
                serviceNo: "2E"
            };

        const wrapper = shallow(<BusinessWorkingHours userAuth={adminUser} />);
        
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        wrapper.setState({serviceNo:"2E"});

        var data = await wrapper.instance().componentDidMount();
        
        wrapper.find('.currentStartTime').equals("change", {
            target: {
              name: "currentStartTime",
              value: "08:00",
            },
          });

    });

    it("Testing current end Time", async () => {

        let adminUser = 
            {
                employeeId: 9,
                employeeIdentifier: "E2351",
                firstName: "AdminGym",
                lastName: "AdminGym",
                address: "admin",
                email: "AdminGym@student.rmit.edu.au",
                phoneNumber: 0,
                password: "adminGym",
                userName: "AdminGym",
                createdDate: "2020-10-13",
                updatedDate: null,
                roster: {
                    id: 35,
                    employee: 9,
                    sunday: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    requestedSunday: true,
                    requestedMonday: true,
                    requestedTuesday: true,
                    requestedWednesday: true,
                    requestedThursday: true,
                    requestedFriday: true,
                    requestedSaturday: true,
                    isApproved: true
                },
                admin: true,
                serviceNo: "2E"
            };

        const wrapper = shallow(<BusinessWorkingHours userAuth={adminUser} />);
        
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        wrapper.setState({serviceNo:"2E"});

        var data = await wrapper.instance().componentDidMount();
        
        wrapper.find('.currentEndTime').equals("change", {
            target: {
              name: "currentEndTime",
              value: "20:00",
            },
          });

    });

    it("Testing current end Time current start time being updated", async () => {

        let adminUser = 
            {
                employeeId: 9,
                employeeIdentifier: "E2351",
                firstName: "AdminGym",
                lastName: "AdminGym",
                address: "admin",
                email: "AdminGym@student.rmit.edu.au",
                phoneNumber: 0,
                password: "adminGym",
                userName: "AdminGym",
                createdDate: "2020-10-13",
                updatedDate: null,
                roster: {
                    id: 35,
                    employee: 9,
                    sunday: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    requestedSunday: true,
                    requestedMonday: true,
                    requestedTuesday: true,
                    requestedWednesday: true,
                    requestedThursday: true,
                    requestedFriday: true,
                    requestedSaturday: true,
                    isApproved: true
                },
                admin: true,
                serviceNo: "2E"
            };

        window.alert = jest.fn();
        const wrapper = shallow(<BusinessWorkingHours userAuth={adminUser} />);
        
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        wrapper.setState({serviceNo:"2E"});

        var data = await wrapper.instance().componentDidMount();

        const startTimeWrapper = wrapper.find('input[name="startTime"]');
        startTimeWrapper.simulate("change", { target:
            {
                name:"startTime",
                value: "10:00" 
            } 
        });

        const endTimeWrapper = wrapper.find('input[name="endTime"]');
        endTimeWrapper.simulate("change", { target: 
            { 
                name:"endTime",
                value: "17:00"
            } 
        });

        data = await wrapper.instance().componentDidMount();

        const updateButton = wrapper.find(".UpdateButton");
        updateButton.simulate('click');

        data = await wrapper.instance().componentDidMount();

        wrapper.find('.currentStartTime').equals("change", {
            target: {
              name: "currentStartTime",
              value: "10:00",
            },
        });

        wrapper.find('.currentEndTime').equals("change", {
            target: {
              name: "currentEndTime",
              value: "17:00",
            },
        });

    });
});