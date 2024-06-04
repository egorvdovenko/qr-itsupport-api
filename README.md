# qr-itsupport-api

## Description

This project is a **Node.js** application that provides a **ticketing system for managing devices**. It includes user authentication and role-based access control, with different roles for **administrators** and regular **users**. Users can **create**, **update**, and **delete** tickets associated with specific devices. Each ticket can have multiple documents attached to it. The project uses **Sequelize** for database operations and **Express.js** for handling HTTP requests.

## Installation

```bash
npm install
```

## Configuration

This project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. This file is not included in the repository for security reasons, so you will need to create it yourself.

The `.env` file should contain the following variables:

- `SECRET_KEY`: The secret key for signing JSON Web Tokens.

Here's an example of what your `.env` file might look like:

```bash
SECRET_KEY=mysecret
```

## Usage

```bash
npm start
```

## Endpoints

The application's routes are organized into separate modules for authentication, users, devices, documents, tickets, and services. The project also includes seeders for populating the database with initial data for users, devices, and tickets.

#### Authentication
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/confirm
- POST /api/auth/resend

#### Users
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

#### Devices
- GET /api/devices
- GET /api/devices/:id
- GET /api/devices/byInventoryNumber/:inventoryNumber
- POST /api/devices
- PUT /api/devices/:id
- DELETE /api/devices/:id

#### Documents
- GET /api/documents
- GET /api/documents/:id
- POST /api/documents
- PUT /api/documents/:id
- DELETE /api/documents/:id

#### Tickets
- GET /api/tickets
- GET /api/tickets/:id
- GET /api/tickets/byUserId/:userId
- POST /api/tickets
- PUT /api/tickets/:id
- DELETE /api/tickets/:id

#### Services
- GET /api/services
- GET /api/services/:id
- POST /api/services
- PUT /api/services/:id
- DELETE /api/services/:id
