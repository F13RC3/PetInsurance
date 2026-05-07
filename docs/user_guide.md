# User Guide

Welcome to the Pet Insurance platform! This guide will help you navigate the application and understand its features.

## Accessing the Platform
The application is accessible via your web browser at [http://localhost](http://localhost) when the Docker containers are running.

## Navigation and Features

### 1. Landing Page & Registration
Upon accessing the platform, you will see our premium landing page.
- Click **Register** or **Get Started** to create a new account.
- The registration securely saves your data and automatically logs you in.
- Alternatively, if you already have an account, click **Login** in the top navigation bar.

### 2. User Dashboard
Once authenticated, you will be directed to your personal dashboard. Your session is secured via a JWT (JSON Web Token) that lasts for 30 minutes.

From the Dashboard, you have access to two main features:

#### Get a Quote
- Enter your pet's age and select a plan type (Comprehensive or Accident Only).
- Click **Calculate Premium**.
- The system will dynamically calculate your monthly premium based on your inputs and display it instantly.

#### Submit a Claim
- If you have an active policy, you can submit a vet bill claim.
- Enter your **Policy ID** and the **Claim Amount**.
- The system will verify with our backend that your Policy ID is valid before accepting the claim.

## Developer & Admin Features
If you are a developer or administrator, you can directly access the backend APIs to manage data:

- To manage Users: Navigate to `http://localhost/api/users/docs`
- To manage Policies: Navigate to `http://localhost/api/policies/docs`
- To manage Claims: Navigate to `http://localhost/api/claims/docs`

These links provide an interactive interface to manually trigger API calls, add new records, and view system health without needing to use the React frontend.
