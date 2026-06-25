# VoyagePlanner
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://voyageplanner.vercel.app/)

### Demo Login (For Quick Testing)
If you want to skip registration, you can log in using this demo account:
- **Email:** demo@voyageplanner.com
- **Password:** password123

VoyagePlanner is a feature-rich, full-stack travel planning application. It allows users to create accounts, search for destinations using the Google Maps API, and dynamically organize their upcoming trips and itineraries.

**[Check out the Live App Here!](https://voyageplanner.vercel.app/)**

---

## Features

- **User Authentication:** Secure sign-up, login, and session persistence using JSON Web Tokens (JWT).
- **Interactive Location Search:** Integrates Google Maps APIs (`places`, `destinations`) via a secure backend proxy.
- **Trip Management:** Full CRUD operations allowing users to create, view, update, and delete travel itineraries.
- **Global State Architecture:** Clean, predictable frontend data management using React Context API paired with the `useReducer` hook.
- **Responsive Design:** Styled using a modular, component-based SASS architecture.

---

## Technologies Used

### Front-End
- **React** (Built with **Vite**)
- **React Router** (Client-side routing)
- **SASS** (Component-based modular styling)
- **Context API & useReducer** (Global state management)

### Back-End
- **Node.js** & **Express** (RESTful API architecture)
- **MongoDB** & **Mongoose** (Database modeling and object data validation)
- **JSON Web Tokens (JWT)** (Stateless user authentication)

---

## Project Structure

```text
voyageplanner/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & Trip Global Contexts
│   │   ├── pages/          # View Pages (Login, SignUp, Dashboard)
│   └── .env.example        # Frontend environment template
│
└── server/                 # Node.js Express Backend
    ├── controllers/        # Request handlers & business logic
    ├── models/             # Mongoose database schemas
    ├── routes/             # Express API route definitions
    └── .env.example        # Backend environment template
