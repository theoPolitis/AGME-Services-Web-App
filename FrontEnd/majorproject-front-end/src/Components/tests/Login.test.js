import React from "react";
import Login from "../account/Login";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import axios from "axios";
import renderWithRouter from './TestingRouter'

jest.mock("axios");


Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

describe('<Login /> test for login component', () => {

    

    test('Username check', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('input[type="text"]').simulate('change', {
            target: {
                name: 'username',
                value: 'Adam'
            }
        });

        expect(wrapper.state('username')).toEqual('Adam')
    })

    it('Password Check', () => {
        const wrapper = shallow(<Login />);

        wrapper.find('input[type="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'passwordCheck'
            }
        });

        expect(wrapper.state('password')).toEqual('passwordCheck');
    })

    it('toggleGet has been implemented', () => {
        const wrapper = renderer.create(<Login />);
        const instance = wrapper.getInstance();
        

        expect(instance.toggeleGet("Theo", "theo")).toBeDefined();
    });

    it('axios get request is successfull should set logged in state to true', async () => {
        window.alert = jest.fn();
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();
        const data = {
            data: 200
        }

        axios.get.mockImplementation(() => Promise.resolve({status: 200, data: {firstName: "Theo"}}))

        const result = await instance.toggeleGet("Theo", "theo");
        expect(instance.state.loggedIn).toBe(true);
    });

    it("axios get request is unsucesful and loggedIn state is false", async () => {
        const wrapper = shallow(<Login />);
        const instance = wrapper.instance();

        axios.get.mockRejectedValue({error: "some error"});
        await instance.toggeleGet("t", "t").catch(err => {
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

        const { history } = renderWithRouter(<Login />);

        expect(history.location.pathname).toEqual('/')
    })
})