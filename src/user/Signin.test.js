import Signin from './Signin';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { signin, authenticate, isAuthenticated } from '../auth/index';

Enzyme.configure({ adapter: new Adapter() });

//import { validateEmailAndPasswordPresence } from '../extra/validations';

    describe('Signin component tests', ()=> {
        const wrapper = shallow(<Signin />);

        it('should have a btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('button')).toHaveLength(1);

            //Button should be of type button
            // expect(wrapper.find('button')
            // .type().defaultProps.type)
            // .toEqual('button');

            //Button should have matching text
            expect(wrapper.find('button').text()).toEqual('Submit');
        });

        it('should have input for email and password', ()=> {
            //Email and password input field should be present
            expect(wrapper.find('input')).toHaveLength(2);
        });


        // it('should have an empty email and password state var', ()=> {
        //     //Optionally test to check if password and email are empty strings on setup
        //     // expect(wrapper.state('email')).toEqual('');
        //     // expect(wrapper.state('password')).toEqual('');
        //     expect(wrapper.find('email')).toEqual('');
        //     expect(wrapper.find('password')).toEqual('');
        // });

        // it('should test email and password presence', () => {

        //      //should return true 
        //      expect(validateEmailAndPasswordPresence('email@email.com', 
        //      'password').toEqual(true));

        //      //should return false
        //       expect(validateEmailAndPasswordPresence('', 
        //      '').toEqual(false));
        // });

    });
