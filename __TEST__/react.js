import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime'; //allow us to use aync await
import ShallowRenderer from 'react-test-renderer/shallow';


import App from '../client/App.jsx';
import Logo from '../client/components/Logo.jsx';
import SidebarLayout from '../client/components/SidebarLayout.jsx';
import Sidebar from '../client/components/Sidebar.jsx';
import MainContainer from '../client/containers/MainContainer.jsx'

// if logo is rendering with correct class
describe('Unit testing React Components', () => {
    describe('Logo', () => {
        test('Correct SVG component renders', () => {
            const { container } = render(<Logo />);
            const svgEl = container.getById("svgMain");
            expect(svgEl.classList.toString().toContain("svg-logo"));
        })
    })
    // if SideBarLayout includes the Sidebar component
    describe('SidebarLayout', () => {
        test('Sidebar renders', () => {
            const renderer = new ShallowRenderer();
            renderer.render(<SidebarLayout />);
            const result = renderer.getRenderOutput();
            expect(result.type).toBe('aside');
            expect(result.props.children).toEqual([
                <Sidebar />
            ]);
        })
    })
    // if sidebar has 3 elements with class navbuttons
    describe('Sidebar', () => {
        test('links render', () => {
            const wrapper = mount(<Sidebar />);
            expect(wrapper.find('.navbuttons').toHaveLength(3));
        })
    })
    // if main container holds the 3 routes and they work
    describe('MainContainer', () => {
        test('links route correctly', async () => {
            const history = createMemoryHistory()
            render(
                <Router history={history}>
                    <MainContainer />
                </Router>,
            )
            const user = userEvent.setup()
            expect(screen.getByText(/You are on the MyProjects page/i).toBeInTheDocument())
            await user.click(screen.getByText(/home/i))
            expect(screen.getByText(/You are home/i).toBeInTheDocument())
            await user.click(screen.getByText(/MyProjects/i))
            expect(screen.getByText(/Project page/i).toBeInTheDocument())
            await user.click(screen.getByText(/create/i))
        })
    })
    describe('Checkbox', () => {
        test('buttons populate with correct color', () => {
            // check if button exists
            expect(screen.getAllByClass('skill-button')).toBeInTheDocument();
            // check color of button
            expect(screen.getAllByClass('skill-button')).toHaveStyle({ backgroundColor: 'rgb(87, 82, 212)' });

        })
        test('buttons change color and state on click', () => {
            // check if on click the button color changes

            // chick on on click the state changes
            expect(screen.getAllByClass('skill-button')).toHaveStyle({ backgroundColor: '#b6b7cb' });
        })
    })
})