import express from "express";
import bodyParser from "body-parser";
import * as swaggerUi from 'swagger-ui-express';
import xssClean from 'xss-clean';
import Routes from "./server/routes/default.routes";
const corsMiddleware = require('./server/middlewares/cors');
const swaggerMiddleware = require('./server/middlewares/swagger');
const errorHandler = require('./server/middlewares/errorHandler');
require("dotenv").config();


const app = express();
const port = process.env.APP_PORT;
app.server = require('http').createServer(app);

app.use('/api-docs', swaggerMiddleware.serve, swaggerMiddleware.setup);
app.use(corsMiddleware);
app.use(express.json()); // for parsing application/json body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use("/api/v1", new Routes().route());

app.server.listen(port, () => {
    const serverAddress = app.server.address().port;
    const message = `Started server on => http://localhost:${serverAddress}`;
    console.log(message);
});

app.use(errorHandler);
const app_url = `http://localhost:${process.env.APP_PORT}`;

export { app_url };