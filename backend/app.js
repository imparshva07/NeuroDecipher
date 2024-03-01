import { dbConnection, closeConnection, startServer } from "./config/mongoConnection.js";

const db = await dbConnection();
startServer()

//closeConnection();