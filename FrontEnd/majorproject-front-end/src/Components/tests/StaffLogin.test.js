import React from "react";
import StaffLogin from "../account/StaffLogin";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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

    
    
})
