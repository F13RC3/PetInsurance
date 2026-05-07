# API Documentation

This document provides an overview of the REST APIs exposed by the backend microservices.

*Note: All microservices use FastAPI, which automatically generates interactive OpenAPI (Swagger) documentation. Once the application is running, you can view and test the APIs directly in your browser.*

## Interactive Swagger UI Links
- **Users Service**: [http://localhost/api/users/docs](http://localhost/api/users/docs)
- **Policies Service**: [http://localhost/api/policies/docs](http://localhost/api/policies/docs)
- **Claims Service**: [http://localhost/api/claims/docs](http://localhost/api/claims/docs)

---

## Users Service

**Base URL**: `/api/users/`

### `POST /register`
Registers a new user and hashes the password securely.
- **Request Body**: `{"name": "...", "email": "...", "password": "..."}`
- **Response**: `200 OK` (Returns created User without password)

### `POST /token`
OAuth2 login endpoint to generate a JWT access token.
- **Request Body (Form Data)**: `username=...&password=...`
- **Response**: `200 OK` `{"access_token": "...", "token_type": "bearer"}`

### `GET /me`
Returns the currently authenticated user based on the provided Bearer token.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

### `GET /`
Returns a list of all registered users from the database.

---

## Policies Service

**Base URL**: `/api/policies/`

### `POST /quote`
Calculates an estimated insurance premium dynamically.
- **Request Body**: `{"pet_age": 2, "pet_breed": "Dog", "plan_type": "Comprehensive"}`
- **Response**: `200 OK` `{"premium": 40.0}`

### `POST /`
Creates a new active insurance policy for a user.
- **Request Body**: `{"user_id": 1, "pet_name": "Buddy", "pet_age": 3, "pet_breed": "Golden", "plan_type": "Comprehensive", "premium": 45.0}`

### `GET /`
Returns a list of all active insurance policies from the database.

---

## Claims Service

**Base URL**: `/api/claims/`

### `POST /`
Submits a new pet insurance claim.
- **Note**: This endpoint synchronously communicates with the Policies service to ensure the provided `policy_id` exists before accepting the claim.
- **Request Body**: `{"policy_id": 1, "amount": 150.0}`
- **Response**: `200 OK` `{"id": 1, "policy_id": 1, "amount": 150.0, "status": "Pending"}`

### `GET /`
Returns a list of all submitted claims from the database.
