# User Guide

Welcome to the Pet Insurance platform! This guide will help you navigate the application and understand its features.

## Accessing the Platform
The application is accessible via your web browser at [http://localhost](http://localhost) when the Docker containers are running.

## Navigation and Features

### 1. The Landing Page
Upon accessing the platform, you will see our premium, dark-themed landing page. 
- **Get a Quote**: Clicking the primary "Get a Quote" button will initiate the policy generation flow (coming soon).
- **Service Highlights**: Learn about our lightning-fast claims processing and flexible policy options.

### 2. System Status Check
At the bottom of the landing page, there is a live API Status Check module. 
- This module automatically communicates with the `Users Microservice` in the background.
- If the system is healthy, you will see a JSON payload of mock user data displayed.
- If the system is down, an error message will inform you that the backend could not be reached.

## Developer & Admin Features
If you are a developer or administrator, you can directly access the backend APIs to manage data:

- To manage Users: Navigate to `http://localhost/api/users/docs`
- To manage Policies: Navigate to `http://localhost/api/policies/docs`
- To manage Claims: Navigate to `http://localhost/api/claims/docs`

These links provide an interactive interface to manually trigger API calls, add new records, and view system health without needing to use the React frontend.
