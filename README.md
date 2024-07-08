# Express Node.js Project

## Overview
This project is an Express.js application that utilizes MySQL with Sequelize ORM for database interactions. It includes features such as encryption/decryption of phone numbers (Here I assume phone field is sensitive and we need to encrypt it before saving to database), validation on user creation, and Swagger documentation for API endpoints.

## Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm
- Docker
- Docker Compose

## Getting Started

### Running in Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mfaizan438/otto-insurance-calculator.git
   cd otto-insurance-calculator

## Install dependencies
npm install

2. ## Run the project:
   ```bash
   npm run db:migrate
   npm run dev

The application will be running at `http://localhost:3000`

## Running with Docker Compose
Build and run the Docker containers:

docker-compose up -d --build 

## Project Containerization:
The project has been containerized to ensure a consistent development and production environment. The Docker Compose setup includes a service for the Node.js application and a MySQL database.

## Running Test Cases
Unit tests for both the controllers and services have been developed to ensure all components are functioning as expected.
npm run test

## Encryption and Decryption
- Phone Number Encryption Key:
The key for encryption and decryption of phone numbers is stored in the .env file. Ensure the key is set correctly to maintain the security of sensitive data.

## Swagger Documentation
# API Documentation:
Access the Swagger documentation for this project at http://localhost:3000/api-docs/.
1. Create user endpoint:  http://localhost:3000/api-docs/#/user/post_users
2. Submit user: http://localhost:3000/api-docs/#/user/post_submit

# Database
MySQL Database:
This project uses MySQL as the database, managed through Sequelize ORM. Ensure the database connection details are correctly set in the .env file.

# Validations
Express Validator:
Validations are implemented on the user creation endpoint using express-validator to ensure data integrity and correctness.

1. Create user request: http://localhost:3000/api/v1/users

![alt text](image-1.png)

2. Call the submit request  http://localhost:3000/api/v1/submit. Here I am calling the external api request but as I already told this endpoint is not working so, we are returning the error response from it.

![alt text](image.png)

3. Docker running logs 
![alt text](image-2.png)