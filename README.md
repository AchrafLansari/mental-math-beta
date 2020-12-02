## Description

Demo : https://mental-math-beta.herokuapp.com/

Beta Version of Multiplayer Mental Math Game :

you join by default a team that has a target (defined by the server) to reach :

- each correct answer : your score and team score increment by 1
- wrong answer : reset your best streak score
- target reached : you receive a congratulation message and scores are resetted

### ENVIRONMENT

I use NodeJS running express for our backend with a React app for the frontend.

#### Basic Setup

- Follow instructions for installing NodeJS for your operating system here: https://nodejs.org/en/download/package-manager/
- Run NPM install
  `cd /path/to/project npm install`
- Start server using the built in script - this will ensure webpack builds the React app
  `npm start`
- Visit http://localhost:3000 in a browser to see the application

**Running the "dev" script will start a webpack build process which will compile all the React components and CSS into a single bundle file. It will also start a nodemon instance of the server which means it will automatically restart and rebuild when you make a change to a Javascript file.**

#### Directory Structure

```
.
├── config (contains server specific config file)
├── client (frontend React code)
│   └── css (styles are included via imports in the React component files)
├── public (static, publicly available files)
│   ├── dist (contains generated files, do not edit any files in here)
│   └── img (static image files)
├── routes (API routing configuration)
├── server (backend processing)
└── server.js (main file)
```

### Code Layout

#### Client side app

The client side app is a React app, with the root component being App.js. In general, we use "Container" components that carry out API requests and maintain state and render "Display" components. Display component receive data via props and actually draw elements on the screen.

#### Backend Server

The server is an Express based RESTful API. There is a route file which defines all the endpoints and then passes information to modules in /server which carry out the application logic. It also serves the static files for the frontend.



### TODO
  - Add a toggle to choose Levels difficulty
  - Add a timer that changes with the level (normal:30s,hard:15s)
  - Add a Team Target timer
  - Add a collaborative Question (example : 3 members of team need to answers to questions that will generate for one player a question filled by the answers of the team members :) )
