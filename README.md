# Project Setup

```bash
cd client
npm install
npm run dev
```

Come back to project directory

```bash
cd server
npm install
npm run dev
```

* Put proper environment variables in .env files in both directories

# API Documentation

This document provides an overview of the available API endpoints for the application. The API allows users to register, authenticate, and manage posts.

---

## Base URL
All endpoints are relative to the base URL:

http://localhost:3000/api

## GET /posts/

- Fetches all the posts

## GET /posts/:id

- Fetches the post with given id

## PUT /posts/:id

- Updates the post with given id

## DELETE /posts/:id

- Deletes the post with given id

## POST /auth/login

- Logs the user in and returns a jwt token

## POST /auth/signup

- Creates a new user

# Additional Details

- Backend uses jwt based authentication.
- All routes are user protected.
- Passwords are hashed using bcrypt.
- UI is responsive.
