import React from 'react';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const { default: App } = require("./App");

Enzyme.configure({ adapter: new Adapter() });

describe('testing custAuth method', () => {
  test('should loggedInStatus should be set to LOGGED_IN', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.customerAuth(data);
    expect(instance.state.loggedInStatus).toEqual("LOGGED_IN");
  })

  test('customer should be set to true if method is called', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.customerAuth(data);
    expect(instance.state.customer).toBe(true);
  })

  test('user should be reated as an object in app state', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.customerAuth(data);
    expect(instance.state.user).toEqual(data);
  })
})

describe('Testing employeeAuth', () => {
  test('if employeeAuth is called then Logged in status should be set to LOGGED_IN ', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.employeeAuth(data);
    expect(instance.state.loggedInStatus).toEqual("LOGGED_IN");
  })

  test('If employee auth is called the employee should be set to true', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.employeeAuth(data);
    expect(instance.state.employee).toBe(true);
  })
  
  test('if employeeAuth method is called a user should be in the App state', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const data = {
      firstName: "Test",
      lastName: "test"
    }

    instance.employeeAuth(data);
    expect(instance.state.user).toEqual(data);
  })
})

describe('Testing the toggleLogout method', () => {
  test('Customer should be false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    instance.toggleLogout();
    expect(instance.state.customer).toBe(false);
  })

  test('Employee should be false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    instance.toggleLogout();
    expect(instance.state.employee).toBe(false);
  })

  test('loggedinStatus should be set to NOT_LOGGED_IN', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    instance.toggleLogout();
    expect(instance.state.loggedInStatus).toBe("NOT_LOGGED_IN");
  })

  test('user should be blank', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const user = {}

    instance.toggleLogout();
    expect(instance.state.user).toEqual(user);
  })
  
  
  
  
})



