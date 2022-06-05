# Activity-Scheduler

## Tech Stack

- React
- Node.js / Express.js
- bcyriptjs
- JWT
- MongoDB
- Docker

## Project Structure

    ├── backend
      ├── src
        ├── controllers
        ├── models
        ├── routes
        └── utils
    ├── frontend
      ├── public
      ├── src
        ├── components
        ├── pages
        └── utils

- **controllers:**
  - contains all controllers for db connections
- **models:**
  - contains all mongoose models
- **routes:**
  - contains all routes
- **utils:**

  - contains db connection and auth

- **components:**
  - contains individual components
- **pages:**
  - contains all the views.
- **utils:**
  - contains all backend connections

## Sofar

- [x] Create a repository

✅ Create backend with Node.js / Express.js

- [x] Create routes for User
  - [x] Create CRUD functions
  - [x] Check routes with Postman
- [x] Create routes forActivities
  - [x] Create CRUD functions
  - [x] Check routes with Postman
- [x] Create routes for JWT
  - [x] Access / Fresh tokens
  - [x] Verify functions

✅ Create frontend with React

✅ Setup Docker for development

- [x] Build page for user display
- [x] Import data from backend
- [x] Create a card component
- [x] Apply css to card view
- [x] Implement JWT for secure login
- [x] Create protected routes at frontend
- [x] Implement persistent login
- [x] Create a spinner for loading data
- [x] Create activity page
- [x] Create user page

## What's Next?

(order may change)

- [ ] Create better profile page for users
- [ ] Create role based dashboards
- [ ] Present activity data on day/week/month scheduler
- [ ] Drag & drop
- [ ] Comment on activity

## How to?

- Backend & Frontend
  - npm i
- Project
  - build image: docker-compose up --build
  - use image: docker-compose up
