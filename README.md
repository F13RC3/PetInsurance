# Pet Insurance Microservices

A modern, containerized microservices application for a pet insurance platform. This project utilizes React for the frontend and FastAPI for multiple backend microservices, all orchestrated with Docker Compose and routed via an Nginx API Gateway.

## Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

*(No local Node.js or Python installation is required)*

### Running the Application

1. Open your terminal in the project root directory.
2. Build and start the containers in detached mode:
   ```bash
   docker compose up --build -d
   ```
3. Access the application:
   - **Frontend UI**: [http://localhost](http://localhost)
   - **Users API Docs**: [http://localhost/api/users/docs](http://localhost/api/users/docs)
   - **Policies API Docs**: [http://localhost/api/policies/docs](http://localhost/api/policies/docs)
   - **Claims API Docs**: [http://localhost/api/claims/docs](http://localhost/api/claims/docs)

4. To stop the application:
   ```bash
   docker compose down
   ```

## Documentation

Comprehensive project documentation can be found in the `docs/` directory:

- [System Architecture](docs/system_architecture.md): High-level overview of the microservices, gateway, and database design.
- [Project Planning](docs/project_planning.md): Roadmap, milestones, and phased implementation details.
- [API Documentation](docs/api_documentation.md): Endpoints, data models, and integration details for the FastAPI services.
- [User Guide](docs/user_guide.md): Instructions for end-users on how to navigate the application.

## Tech Stack
- **Frontend**: React, Vite, CSS3
- **Backend**: Python 3.11, FastAPI, Pydantic, SQLAlchemy
- **Database**: PostgreSQL
- **Infrastructure**: Docker, Docker Compose, Nginx
