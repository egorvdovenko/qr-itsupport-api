# qr-itsupport-api

## Description

This project is a Node.js application that provides a ticketing system for managing devices. It includes user authentication and role-based access control, with different roles for administrators and regular users.

Users can create, update, and delete tickets associated with specific devices. Each ticket can have multiple documents attached to it. The project uses Sequelize for database operations and Express.js for handling HTTP requests. 

The application's routes are organized into separate modules for authentication, users, devices, documents, tickets, and services. The project also includes seeders for populating the database with initial data for users, devices, and tickets.