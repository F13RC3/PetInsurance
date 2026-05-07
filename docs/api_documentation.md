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

### `GET /`
Returns a list of all registered users.
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "name": "Alice Smith",
      "email": "alice@example.com"
    }
  ]
  ```

### `GET /health`
Returns the health status of the microservice.
- **Response**: `200 OK`
  ```json
  {
    "status": "ok",
    "service": "users-service"
  }
  ```

---

## Policies Service

**Base URL**: `/api/policies/`

### `GET /`
Returns a list of all active insurance policies.
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 101,
      "user_id": 1,
      "pet_name": "Buddy",
      "plan_type": "Comprehensive",
      "premium": 45.0
    }
  ]
  ```

### `GET /health`
Returns the health status of the microservice.

---

## Claims Service

**Base URL**: `/api/claims/`

### `GET /`
Returns a list of all submitted claims.
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1001,
      "policy_id": 101,
      "amount": 150.0,
      "status": "Approved"
    }
  ]
  ```

### `GET /health`
Returns the health status of the microservice.
