import { dbConnection, closeConnection, startServer } from "./config/mongoConnection.js";
//import configRoutesFunction from './routes/auth.js';
import authFunctions from './routes/auth.js';
import express from 'express';
const app = express();

//configRoutesFunction(app);

const db = await dbConnection();
startServer()

app.use('/auth', authFunctions);

//closeConnection();