import React from "react";
import {shallow, mount, ReactWrapper} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../layout/Header";
import expect from 'expect'
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Header elements', () => {
    test('shoould contain nav elements Home, about us, staff Login, login and register', () => {
        const wrapper = shallow(<Header />);

        expect(wrapper.containsMatchingElement(<Link to="/" >Home</Link> ));
        expect(wrapper.containsMatchingElement(<Link to="/aboutus" >About us</Link>));
        expect(wrapper.containsMatchingElement(<Link to='/login'>Login</Link>));
        expect(wrapper.containsMatchingElement(<Link to='/staffLogin' >Staff Login</Link> ));
        expect(wrapper.containsMatchingElement(<Link to='/createAccount' ><button className="RegisterButton">Register</button></Link>));
    });

    test('handle logout when employee is logged in', () => {
        const spy = jest.fn();
        const wrapper = shallow(<Header employee={true} toggleLogout={spy} />)
        
        wrapper.find('button').simulate('click');
        expect(spy.mock.calls.length).toEqual(1);
    })

    test('handle logout when customer is logged in', () => {
        const spy = jest.fn();
        const wrapper = shallow(<Header customer={true} toggleLogout={spy} />)
        
        wrapper.find('button').simulate('click');
        expect(spy.mock.calls.length).toEqual(1);
    })
    
    
    
})
