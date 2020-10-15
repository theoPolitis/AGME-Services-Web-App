import React from "react";
import Roster from "../roster/Roster"
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import renderWithRouter from "./TestingRouter"
import axios from "axios";
import expectExport from "expect";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

beforeEach(() => {
    axios.put.mockImplementation(() => Promise.resolve( {}));
}

);

describe( "<Roster/> test for Roster.js", ()=>{
    it("Testing that the state updates correctly when page renders", async () =>
    {
        var user = {"employeeId":11,
        "employeeIdentifier":"E3456",
        "firstName":"Sam",
        "lastName":"ten",
        "address":"10 the parade",
        "email":"sam@student.rmit.edu.au",
        "phoneNumber":"0544654634",
        "password":"sam","userName":
        "Sam","createdDate":"2020-10-15",
        "updatedDate":null,
        "roster":{"id":35,"employee":11,"sunday":true,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"requestedSunday":true,"requestedMonday":true,"requestedTuesday":true,"requestedWednesday":true,"requestedThursday":true,"requestedFriday":true,"requestedSaturday":true,"isApproved":true},
        "admin":false,
        "serviceNo":"2E"};
        const wrapper = shallow(<Roster user = {user}/>);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        const button = wrapper.find("button");

        expect(user.roster === wrapper.state("roster"));
    });
    it("Testing that the state updates when change is selected", async () =>
    {
        var user = {"employeeId":11,
        "employeeIdentifier":"E3456",
        "firstName":"Sam",
        "lastName":"ten",
        "address":"10 the parade",
        "email":"sam@student.rmit.edu.au",
        "phoneNumber":"0544654634",
        "password":"sam","userName":
        "Sam","createdDate":"2020-10-15",
        "updatedDate":null,
        "roster":{"id":35,"employee":11,"sunday":true,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"requestedSunday":true,"requestedMonday":true,"requestedTuesday":true,"requestedWednesday":true,"requestedThursday":true,"requestedFriday":true,"requestedSaturday":true,"isApproved":true},
        "admin":false,
        "serviceNo":"2E"};
        const wrapper = shallow(<Roster user = {user}/>);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        wrapper.find('.button').at(0).prop('onClick')();
        expect(wrapper.state("roster").requestedSunday === false);
    });

    it("Testing that the state updates when request is sent", async () =>
    {
        window.alert = jest.fn();
        var user = {"employeeId":11,
        "employeeIdentifier":"E3456",
        "firstName":"Sam",
        "lastName":"ten",
        "address":"10 the parade",
        "email":"sam@student.rmit.edu.au",
        "phoneNumber":"0544654634",
        "password":"sam","userName":
        "Sam","createdDate":"2020-10-15",
        "updatedDate":null,
        "roster":{"id":35,"employee":11,"sunday":true,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"requestedSunday":true,"requestedMonday":true,"requestedTuesday":true,"requestedWednesday":true,"requestedThursday":true,"requestedFriday":true,"requestedSaturday":true,"isApproved":true},
        "admin":false,
        "serviceNo":"2E"};
        const wrapper = shallow(<Roster user = {user}/>);
        wrapper.setProps({loggedInStatus: "LOGGED_IN"});
        const data = await wrapper.instance().componentDidMount();
        wrapper.find('.button').at(0).prop('onClick')();
        wrapper.find(".submit_button").prop('onClick')();
        expect(wrapper.state("roster").isApproved === false);
    });


    
}
)