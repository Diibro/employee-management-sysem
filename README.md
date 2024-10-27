# Employee Management System API

This project is a NestJS-based *Employee Management System* that provides functionalities to manage employees, track attendance, generate reports, and more. This API is designed for efficient employee management with secure authentication and authorization.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Available API Endpoints](#available-api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Employee Management Routes](#employee-management-routes)
  - [Attendance Routes](#attendance-routes)
  - [Report Generation](#report-generation)
- [Testing the API](#testing-the-api)
- [Technologies Used](#technologies-used)
- [Error Handling](#error-handling)
- [Event Logging](#event-logging)
- [Pagination](#pagination)
- [License](#license)

## Project Overview

The *Employee Management System API* allows for full employee management, including:

- Secure authentication and authorization.
- CRUD operations for employees.
- Attendance tracking and management.
- Report generation in PDF and Excel formats.
- Comprehensive error handling and logging for maintainable and scalable code.

## Prerequisites

- *Node.js* (v16 or higher)
- *npm* or *yarn*
- *PostgreSQL* (or any supported SQL database)

## Installation

1. *Clone the repository*:
   bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   

2. *Install dependencies*:
   bash
   npm install
   

3. *Set up the environment variables* by creating a .env file in the root directory and adding your configurations.

## Database Configuration

The application uses *PostgreSQL* as its database. Ensure your PostgreSQL service is running and the database is properly configured.

## Environment Variables

Configure the following variables in your .env file:

plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=employee_management
JWT_SECRET=your_jwt_secret


## Available API Endpoints

### Authentication Routes

- *POST /auth/register*: Register a new user.
- *POST /auth/login*: Login and receive a JWT token.
- *POST /auth/logout*: Logout the current user.
- *POST /auth/refresh-token*: Refresh the JWT token.

### Employee Management Routes

- *GET /employees*: Retrieve a list of all employees.
- *POST /employees*: Add a new employee.
- *GET /employees/:id*: Get details of a specific employee.
- *PUT /employees/:id*: Update employee details.
- *DELETE /employees/:id*: Remove an employee.

### Attendance Routes

- *POST /attendance*: Mark attendance for an employee.
- *GET /attendance*: Retrieve attendance records.
- *GET /attendance/:employeeId*: Get attendance for a specific employee.

### Report Generation

- *GET /reports/pdf*: Generate a PDF report of all employee data.
- *GET /reports/excel*: Generate an Excel report of all employee data.

## Testing the API

The project includes comprehensive tests written in *Jest*. To run the tests:

bash
npm test


## Technologies Used

- *NestJS*: Backend framework.
- *TypeORM*: Database ORM.
- *PassportJS*: Authentication.
- *jsPDF* and *ExcelJS*: PDF and Excel report generation.
- *Jest*: Unit and integration testing.

## Error Handling

The application provides centralized error handling, ensuring that all API errors are captured and returned in a structured format. Common error types include validation errors, authentication errors, and database-related errors.

## Event Logging

Logs significant events (e.g., user login, logout, data updates) for traceability and debugging. The logging can be customized to capture additional information as needed.

## Pagination

To handle large data sets, the API supports pagination on endpoints like GET /employees to limit the number of results returned at once.

## License

This project is licensed under the MIT License.