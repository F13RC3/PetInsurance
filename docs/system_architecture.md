# System Architecture

The Pet Insurance application utilizes a microservices architecture to ensure high scalability, fault tolerance, and independent deployability of business domains.

## Overview

The system is containerized using Docker and orchestrated with Docker Compose. Traffic flows through an API Gateway which routes requests to the frontend application or the appropriate backend microservice based on the URL path.

## Components

### 1. API Gateway (Nginx)
- **Role**: Single entry point for all incoming traffic.
- **Responsibilities**: 
  - Reverse proxying requests to the Frontend (React).
  - Routing API calls (`/api/users`, `/api/policies`, `/api/claims`) to the respective FastAPI microservices.
  - Handling WebSocket connections for Vite's Hot Module Replacement (HMR) during development.

### 2. Frontend Application
- **Tech**: React, Vite, CSS
- **Role**: The user interface.
- **Architecture**: A Single Page Application (SPA) that communicates asynchronously with the backend microservices via the API Gateway.

### 3. Backend Microservices
Each microservice is an independent FastAPI application running on Python 3.11, connected to the PostgreSQL database using SQLAlchemy ORM.

*   **Users Service (`/api/users`)**: 
    *   Manages user authentication (`/register`, `/token`), profile data, and identity management.
    *   **Security**: Uses `bcrypt` for password hashing and issues JSON Web Tokens (JWT) for secure session management.
*   **Policies Service (`/api/policies`)**: 
    *   Handles insurance logic, quoting (`/quote`), premium calculation, and active policy data.
*   **Claims Service (`/api/claims`)**: 
    *   Responsible for ingestion of vet bills, claim status tracking, and reimbursement calculations.
    *   **Integration**: Performs internal cross-service HTTP requests to the `policies-service` to validate the existence of a Policy ID before processing a new claim.

### 4. Database (PostgreSQL)
- **Tech**: PostgreSQL 15
- **Role**: Persistent data storage.
- **Architecture**: A single PostgreSQL instance is used in the current development environment. In production, each microservice should ideally have its own logical database or schema to maintain the bounded context and prevent tight coupling at the database level.

## Data Flow Example: Submitting a Claim
1. User interacts with the Frontend to submit a claim.
2. Frontend sends a `POST /api/claims/` request.
3. API Gateway receives the request and proxies it to the `claims-service` container.
4. `claims-service` processes the request, optionally verifying the policy via synchronous or asynchronous communication with the `policies-service`.
5. `claims-service` persists the claim to the PostgreSQL database.
6. A response is returned to the Frontend via the Gateway.
