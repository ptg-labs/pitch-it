import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime'; //allows us to use aync await
import ShallowRenderer from 'react-test-renderer/shallow';
const fs = require('fs');
const path = require('path');
const testDatabase = require('../server/test.json');

const testJsonFile = path.resolve(__dirname, '../server/test.json');


import App from '../client/App.jsx';
import Logo from '../client/components/Logo.jsx';
import SidebarLayout from '../client/components/SidebarLayout.jsx';
import Sidebar from '../client/components/Sidebar.jsx';
import MainContainer from '../client/containers/MainContainer.jsx';
import Project from '../client/components/Project.jsx';

// if logo is rendering with correct className
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
    // if sidebar has 3 elements with className navbuttons
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
            // if button exists on page
            expect(screen.getAllByClass('skill-button')).toBeInTheDocument();
            // color of button on render
            expect(screen.getAllByClass('skill-button')).toHaveStyle({ backgroundColor: 'rgb(87, 82, 212)' });

        })
        test('buttons change color and state on click', () => {
            render(<Checkbox />);
            const button = screen.getByText(/skill/i);
            fireEvent.click(button);
            // if on click the color changes
            expect(screen.getAllByClass('skill-button')).toHaveStyle({ backgroundColor: '#b6b7cb' });
        })
    })
    describe('Project', () => {
        let project;
        const props = {
            owner_name: 'Yufa',
            title: 'Test Project',
            description: 'It is a test',
            skills: 'html, css, javascript',
            date: Date.now(),
            handleDelete: jest.fn()
        };

        const { owner_name, title, description, skills, date, handleDelete } = props;

        beforeEach(() => {
            project = render(<Project {...props} />);
        });

        test('project rendered with appropriate text', () => {
            expect(project.getByText('Created By:').nextSibling).toHaveTextContent(owner_name);
            expect(project.getByText('Description:').nextSibling).toHaveTextContent(description);
            expect(project.getByText('Skills needed:').nextSibling).toHaveTextContent(skills);
            expect(project.getByText({ title }).nextSibling).toHaveTextContent(title);
            expect(project.getByText('Date:').nextSibling).toHaveTextContent(date);

        })
        test('The functions passed down should be invoked on click', () => {
            const button = screen.getAllByClass('.delete-button');
            fireEvent.click(button);
            expect(handleDelete).toHaveBeenCalled();
        })
    })
})