import React from "react";
import StaffLogin from "../account/StaffLogin";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import renderer from "react-test-renderer";
import renderWithRouter from './TestingRouter'

jest.mock("axios");
Enzyme.configure({ adapter: new Adapter() });

describe('Tests for Staff login Component', () => {
    
    it('Username check in state', () => {
        const wrapper = shallow(<StaffLogin />);

        wrapper.find('input[type="text"]').simulate('change', {
            target: {
                name: 'username',
                value: 'Adam'
            }
        });

        expect(wrapper.state('username')).toEqual('Adam');
    })


    it('Password check in state', () => {
        const wrapper = shallow(<StaffLogin />);

        wrapper.find('input[type="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'testPassword'
            }
        });

        expect(wrapper.state('password')).toEqual('testPassword');
    })

    it('toggleGet has been implemented', () => {
        const wrapper = renderer.create(<StaffLogin />);
        const instance = wrapper.getInstance();
        

        expect(instance.toggleGet("Theo", "theo")).toBeDefined();
    });

    it('axios get request is successfull should set logged in state to true', async () => {
        window.alert = jest.fn();
        const wrapper = shallow(<StaffLogin />);
        const instance = wrapper.instance();
        const data = {
            data: 200
        }

        axios.get.mockImplementation(() => Promise.resolve({status: 200, data: {firstName: "Theo"}}))

        await instance.toggleGet("Theo", "theo");
        expect(instance.state.loggedIn).toBe(true);
    });

    it("axios get request is unsucesful and loggedIn state is false", async () => {
        const wrapper = shallow(<StaffLogin />);
        const instance = wrapper.instance();

        axios.get.mockRejectedValue({error: "some error"});
        await instance.toggleGet("t", "t").catch(err => {
            expect(err).toEqual({error: "some error"});
        })

        expect(instance.state.loggedIn).toBe(false);
    })

    it("Page redirects susccesfully after succesful axios request", async () => {
        axios.get.mockImplementation(() => {
            Promise.resolve({
                data: {status: fail}
            })
        })

        const { history } = renderWithRouter(<StaffLogin />);

        expect(history.location.pathname).toEqual('/')
    })
    
})
