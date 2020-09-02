import React from "react";
import Signup from "../account/Signup";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('Signup page check fields', () => {
    test('First Name check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName',
                value: 'Adam'
            }
        });
    
        expect(wrapper.state('firstName')).toEqual('Adam')
    })

    test('Last Name check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="lastName"]').simulate('change', {
            target: {
                name: 'lastName',
                value: 'Adam'
            }
        });
    
        expect(wrapper.state('lastName')).toEqual('Adam')
    })

    test('Email check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 's3661671@student.rmit.edu.au'
            }
        });
    
        expect(wrapper.state('email')).toEqual('s3661671@student.rmit.edu.au')
    })

    test('Address check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="address"]').simulate('change', {
            target: {
                name: 'address',
                value: '3 pink ave'
            }
        });
    
        expect(wrapper.state('address')).toEqual('3 pink ave')
    })

    test('Phone Number check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="phoneNumber"]').simulate('change', {
            target: {
                name: 'phoneNumber',
                value: '044446565'
            }
        });
    
        expect(wrapper.state('phoneNumber')).toEqual('044446565')
    })

    test('Username check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="userName"]').simulate('change', {
            target: {
                name: 'userName',
                value: 'Adam'
            }
        });
    
        expect(wrapper.state('userName')).toEqual('Adam')
    })

    test('password check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'adam'
            }
        });
    
        expect(wrapper.state('password')).toEqual('adam')
    })

    test('Confirm password check', () => {
        const wrapper = shallow(<Signup />);
    
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: 'adam'
            }
        });
    
        expect(wrapper.state('confirmPassword')).toEqual('adam')
    })

    test('validate password to be true when passwords are the same', () => {
        const wrapper = renderer.create(<Signup />);
        const inst = wrapper.getInstance();

        const data = {
            password: "admin",
            confrimPassword: "admin"
        }

        expect(inst.validate(data.password, data.confrimPassword)).toBe(true);
    })

    test('Validate password to be false when passwords are not the same', () => {
        const wrapper = renderer.create(<Signup />);
        const inst = wrapper.getInstance();

        const data = {
            password: "admin",
            confrimPassword: "notPassword"
        }

        expect(inst.validate(data.password, data.confrimPassword)).toBe(false);
    })
    

})
