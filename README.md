# Planr - Front End

Planr is a full-stack web application that allows a user to create/save events in their profile as well as add various details about the event.

- [Deployed front-end](https://planr-events.netlify.com/login)
  - Log in as an admin user with email `john@test.com` & password `test`
- [Corresponding Back-end Repo](https://github.com/lilyhoratio/planr-backend)

## Short demo:

![](https://github.com/lilyhoratio/planr-frontend/tree/master/src/images/signin.gif)

Features:

- Secure user authentication by hashing passwords with bcrypt
- Events list: view events and search for events by name
- Add, edit, and delete events
- For each event, view an event dashboard which includes budget items and metrics (total cost of items, total cost of purchased items, remaining budget, and percent of budget reached). Add, toggle competion status, edit, and delete budget items.
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
