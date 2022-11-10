# Pitch It
Connect with developers to find the best team to collaborate on projects

## Table of Contents

- [About](#about)
- [Installing](#installing)
- [Contributing](#contributing)
- [To-Do](#to-do)


## About
Introducing Pitch It, a fullstack web-app built using React, Express, and PostgreSQL. Pitch it allows users to create projects, pitch their ideas to other developers, and recruit other developers based on their skillset.  

This project had a great beginning, and Thundergeese sought to improve the codebase by tidying up code, optimizing where possible, elaborating in 
documentation and patching security holes.

As of the Thundergeese team's iteration, the codebase has been refactored in a variety of ways. First of which is to better utilize SQL's 
relational foreign key abilities, featuring cascading behavior on tables upon user deletion. User authentication has been added to the 
application using json web tokens.
Unit tests have been written to ensure desired behavior of certain components and back-end calls. The ability to change the logged-in user's
password, and delete said account, have been added.

The app could still expand functionality by allowing coordination via user teams and messaging, and being able to edit or favorite a project.
Styling could also be improved upon.

Technical challenges included refactoring code on the front end away from sending data set in localstorage in requests to the backend, implementing
JWT authentication (if you look closely, cookies are not being sent automatically by requests from the front end), and creating our database from scratch.
Currently, MyProjects.jsx does not request data from the back-end, so this is something to fix in the short-term.



## Installing
You will need your own URI to make use of a database matching our schema (please check database.png in this directory), as 
well as your own secret token for JWT.
Create a .env file and in it assign PG_URI to be the url of your database, then a TOKEN_SECRET containing a string you find suitable for JWT.

After cloning the repo to your local machine, from the directory cloned run:

`npm install`

`npm start`

Sign up, log in, and check out other projects or create your own!

# To-Do
Allow users to join teams

Let users favorite projects and have them populate in the Favorites page

Consolidate styling - Implement mobile first CSS

Give owners the ability to edit project information

Allow team members to chat and share code

## Contributing
Rabea Ahmad, Young Kim, Hao Ze Lin, Drew Manley, Kevin Tseng

## Thundergeese Iteration
Co-authored-by: Yufa Li <112290188+01001101CK@users.noreply.github.com>
Co-authored-by: Michael Costello <neighbor-peace@users.noreply.github.com>
Co-authored-by: Steven Geiger <geistnine@users.noreply.github.com>
Co-authored-by: Debbie Zavaleta <dzavaleta96@users.noreply.github.com>
Co-authored-by: Cedar Cooper<CedarCooper@users.noreply.github.com>