import React from "react";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from "./TestingRouter";

import Booking from "../booking/Booking";
import { wait } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    var baseUrl = "http://localhost:8080/api";
    switch (url) {
      case baseUrl + "/serviceType/all":
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
            {
              serviceNo: "2E",
              serviceName: "Gym",
              createdDate: "2020-10-12",
              updatedDate: null,
              startTime: "08:00",
              endTime: "20:00",
            },
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
      case baseUrl + "/employee/all/1E":
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
              createdDate: "2020-10-12",
              updatedDate: null,
              roster: {
                id: 25,
                employee: 8,
                sunday: true,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
              },
              bookingList: [],
              admin: false,
            },
          ],
        });
      case baseUrl + "/booking/" + "2020-10-31" + "/" + "E1234":
        return Promise.resolve({
          data: [
            {
              bookingTimes: [
                "8:00",
                "9:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
              ],
            },
          ],
        });
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

describe('<Booking /> component tests', () => {

    it("Testing User redirected to home if not logged in", async () => {
        const { history } = renderWithRouter(<Booking />);
        expect(history.location.pathname).toEqual('/');
    });

    it("Testing Services are Set when Booking is rendered", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        expect(wrapper.state('services').length).toEqual(3);
    });

    it("Testing Service updates state when selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        const serviceNoWrapper = wrapper.find('.ServiceNo');
        serviceNoWrapper.simulate('change', {target: { value : '1E'}});
        expect(wrapper.state('selectedService')).toEqual('1E');
    });

    it("Testing Service updates to null when null state when selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        const serviceNoWrapper = wrapper.find('.ServiceNo');
        serviceNoWrapper.simulate('change', {target: { value : '1E'}});
        expect(wrapper.state('selectedService')).toEqual('1E');
        serviceNoWrapper.simulate('change', {target: { value : 'none'}});
        expect(wrapper.state('selectedService')).toEqual('none');
    });

    it("Testing Employees Field is diabled when no service is selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        //Wait till the component mounts i.e. set state and axios have finished running before checking state attributes.
        var data = await wrapper.instance().componentDidMount();
        expect(wrapper.find('.employeeNo').props().disabled).toEqual(true);
    });

    it("Testing Date Field is diabled when no service is selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        //Wait till the component mounts i.e. set state and axios have finished running before checking state attributes.
        var data = await wrapper.instance().componentDidMount();
        expect(wrapper.find('.date').props().disabled).toEqual(true);
    });

    it("Testing Time Field is diabled when no service is selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        //Wait till the component mounts i.e. set state and axios have finished running before checking state attributes.
        var data = await wrapper.instance().componentDidMount();
        expect(wrapper.find('.time').props().disabled).toEqual(true);
    });

    it("Testing Submit Button is diabled when no service is selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        //Wait till the component mounts i.e. set state and axios have finished running before checking state attributes.
        var data = await wrapper.instance().componentDidMount();
        expect(wrapper.find('.updateButton').props().disabled).toEqual(true);
    });

    it("Testing Employees update when service selected", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        //Wait till the component mounts i.e. set state and axios have finished running before checking state attributes.
        var data = await wrapper.instance().componentDidMount();
        const serviceNoWrapper = wrapper.find('.ServiceNo');
        serviceNoWrapper.simulate('change', {target: { value : '1E'}});
        expect(wrapper.state('selectedService')).toEqual('1E');

        //After the state was updated wait till the component mounts again
        data = await wrapper.instance().componentDidMount();

        //Check that the state has updated to reflect the relevant 
        expect(wrapper.state('employees').length).toEqual(1);
    });

    it("Testing already booked times are not displayed", async () => {
      window.alert = jest.fn();
        const wrapper = shallow(<Booking />);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});

        //Waiting for the component to mount correctly before setting the selected service
        var data = await wrapper.instance().componentDidMount();

        //Finding the service selection field and choosing the '1E' option
        const serviceNoWrapper = wrapper.find('.ServiceNo');
        serviceNoWrapper.simulate('change', {target: { value : '1E'}});

        //Waiting for the component to mount correctly before setting the employee
        data = await wrapper.instance().componentDidMount();

        const employeeWrapper = wrapper.find('.employeeNo');
        employeeWrapper.simulate('change', {target: {value : 'E1234'}});

    //Waiting for the component to mount correctly before setting the date
    data = await wrapper.instance().componentDidMount();

    const dateWrapper = wrapper.find(".date");
    dateWrapper.simulate("change", { target: { value: "2020-10-31" } });

    data = await wrapper.instance().componentDidMount();

    const timeWrapper = wrapper.find(".time");
    timeWrapper.simulate("change", { target: { value: "10:00" } });

    data = await wrapper.instance().componentDidMount();
    expect(wrapper.find(".updateButton").props().disabled).toEqual(false);
  });

  it("Testing submit button is disabled when fields are deselcted", async () => {
    window.alert = jest.fn();
    const wrapper = shallow(<Booking />);
    wrapper.setProps({ loggedInStatus: "LOGGED_IN" });

    //Waiting for the component to mount correctly before setting the selected service
    var data = await wrapper.instance().componentDidMount();

    //Finding the service selection field and choosing the '1E' option
    const serviceNoWrapper = wrapper.find(".ServiceNo");
    serviceNoWrapper.simulate("change", { target: { value: "1E" } });

    //Waiting for the component to mount correctly before setting the employee
    data = await wrapper.instance().componentDidMount();

    const employeeWrapper = wrapper.find(".employeeNo");
    employeeWrapper.simulate("change", { target: { value: "E1234" } });

    //Waiting for the component to mount correctly before setting the date
    data = await wrapper.instance().componentDidMount();

    const dateWrapper = wrapper.find(".date");
    dateWrapper.simulate("change", { target: { value: "2020-10-31" } });

    data = await wrapper.instance().componentDidMount();

    const timeWrapper = wrapper.find(".time");
    timeWrapper.simulate("change", { target: { value: "10:00" } });

    data = await wrapper.instance().componentDidMount();
    expect(wrapper.find(".updateButton").props().disabled).toEqual(false);

    timeWrapper.simulate("change", { target: { value: "none" } });
    expect(wrapper.find(".updateButton").props().disabled).toEqual(true);
  });
});
