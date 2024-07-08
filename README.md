# Express Node.js Project

## Overview
This project is an Express.js application that utilizes MySQL with Sequelize ORM for database interactions. It includes features such as encryption/decryption of phone numbers, validation on user creation, and Swagger documentation for API endpoints.

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

## Run the project:
npm run dev

The application will be running at `http://localhost:3000`

## Running with Docker Compose
Build and run the Docker containers:

docker-compose up -d --build 

## Project Containerization:
The project has been containerized to ensure a consistent development and production environment. The Docker Compose setup includes a service for the Node.js application and a MySQL database.

## Running Test Cases
npm run test

## Encryption and Decryption
- Phone Number Encryption Key:
The key for encryption and decryption of phone numbers is stored in the .env file. Ensure the key is set correctly to maintain the security of sensitive data.

## Swagger Documentation
# API Documentation:
Access the Swagger documentation for this project at http://localhost:3000/api-docs/.
# Database
MySQL Database:
This project uses MySQL as the database, managed through Sequelize ORM. Ensure the database connection details are correctly set in the .env file.

# Validations
Express Validator:
Validations are implemented on the user creation endpoint using express-validator to ensure data integrity and correctness.