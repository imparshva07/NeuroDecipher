import { dbConnection, closeConnection, startServer } from "./config/mongoConnection.js";

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

app.use(cookieparser());
app.use(express.json());
app.use("/api", routes);

// Define MongoDB connection function
async function connectToMongoDB() {
    try {
      //To be connected to the MongoDB Atlas server
        await mongoose.connect("mongodb://localhost:27017/neucipherProj", {
            useNewUrlParser: true,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the application if unable to connect to the database
    }
}

// Start the Express server
async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(5000, () => {
            console.log("App is listening on port 5000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the application if unable to start the server
    }
}

// Start the server
startServer();
//closeConnection();
