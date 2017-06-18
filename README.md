# StarWars mad libs - Sing along edition

## Installation
```bash
$ yarn install
$ npm start
```

## About this project
This project is a playground where I am buildning an react application with a auto suggest using API requests.
To make it worth my while I made it into a little game, where a user can pick random characters from the StarWars universe and the data from those items will be used to compose a song (from Pippi Longstocking), mab libs style.

## Technical depencencies
* create-react-app: Trying React new shiny CLI tool for a non config development environment with webpack bundling with appropriate loaders, hot module reloading and testing out of the box. They even include Service workers from scratch.
* redux: Hold the state of all components
* redux-session: Saves some state in session storage, to persist after reloading the browser.
* redux-thunk: Allows for my async action creators, calling a remote API.
* Semistandard: Because who doesn't love tidy looking code, and semi colons do look good, don't they?
* (Jest): I would like to feel the need to unit test everything and get to understand what and why to test, but due to the simplicity of the app, and my inexperience with unittesting in client side javascript. I decided not to deep dive into testing in this project. Maybe in the next one though.
