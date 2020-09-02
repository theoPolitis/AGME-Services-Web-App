import React from "react";
import Login from "../account/Login";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";


Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

describe('<Login /> test for login conponent', () => {
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

    // it('Returns data', () => {
    //     const wrapper = shallow(<Login />);

    //     wrapper.find('input[type="text"]').simulate('change', {
    //         target: {
    //             name: 'username',
    //             value: 'Adam'
    //         }
    //     });

    //     wrapper.find('input[type="password"]').simulate('change', {
    //         target: {
    //             name: 'password',
    //             value: 'passwordCheck'
    //         }
    //     });

    //     const data = {
    //         username: "adam",
    //         password: "passwordCheck"
    //     }
        
    //     wrapper.find('button').simulate('click');

    //     axios.get.mockImplementation(() => Promise.resolve({data}));

    //     expect(wrapper.state("loggedIn")).toBe(true);
    // })

    // test('should fetch users', () => {
    //     const wrapper = shallow(<Login />);

    //     const users = {
    //         username: 'Bob',
    //         password: "password"
    // };
    //     const resp = {data: users};
    //     axios.get.mockResolvedValue(resp);

    //     // or you could use the following depending on your use case:
    //     // axios.get.mockImplementation(() => Promise.resolve(resp))

    //     expect(wrapper.state("loggedIn")).toBe(true); 
    // })
    
})
