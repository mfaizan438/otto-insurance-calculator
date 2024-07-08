import express from "express";
import bodyParser from "body-parser";
import Routes from "./server/routes/default.routes";
const corsMiddleware = require('./server/middlewares/cors');
const swaggerMiddleware = require('./server/middlewares/swagger');
const errorHandler = require('./server/middlewares/errorHandler');
require("dotenv").config();

/**
 * The main application file for setting up the Express server.
 * This file configures the server, including middleware for CORS, Swagger documentation,
 * body parsing, and routes. It also handles starting the server and error handling.
 */

const app = express(); // Initialize express application
const port = process.env.APP_PORT; // Define the port number from environment variables
app.server = require('http').createServer(app); // Create an HTTP server with express app

// Middleware for serving Swagger API documentation
app.use('/api-docs', swaggerMiddleware.serve, swaggerMiddleware.setup);

// Apply CORS middleware to allow cross-origin requests
app.use(corsMiddleware);

// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Setup API routes
app.use("/api/v1", new Routes().route());

// Start the server and listen on the specified port
app.server.listen(port, () => {
    const serverAddress = app.server.address().port;
    const message = `Started server on => http://localhost:${serverAddress}`;
    console.log(message);
});

// Middleware for handling errors
app.use(errorHandler);

// Export the application URL for potential use elsewhere in the application
const app_url = `http://localhost:${process.env.APP_PORT}`;
export { app_url };
