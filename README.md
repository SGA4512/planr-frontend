# Planr - Front End

Planr is a full-stack web application that allows a user to create/save events in their profile as well as add various details about the event.

- [Deployed front-end](https://planr-events.netlify.com/login)
  - Log in as an demo user with email `john@test.com` & password `test`
- [Corresponding Back-end Repo](https://github.com/lilyhoratio/planr-backend) and [APIdocs (WIP)](https://planr-backend-apidocs.netlify.com/)

## Short demo:

Sign in and events list:

- secure user authentication by hashing passwords with bcrypt
- events list: view events and search for events by name
- add, edit, and delete events

![Image from giphy](signin.gif)

Event dashboard:

- view event information and add, toggle completion status, edit, and delete budget items
- view updated metrics, such as total cost of purchased items, remaining budget, and percent of budget reached

![Image from giphy](editing.gif)

Other features:

- User logged-in state managed by Context API and used for conditional rendering and protected routes

## Tech Stack

- Front-end
  - React.js
  - React Router
  - Ant design styling library
  - SASS
  - Formik & Yup
  - Moment.js
- Back-end
  - SQLite (development)
  - PostgreSQL (production)
  - Node.js
  - Express
  - Knex.js
