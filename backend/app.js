//import { dbConnection, closeConnection, startServer } from "./config/mongoConnection.js";
//import configRoutesFunction from './routes/auth.js';
// import authFunctions from './routes/auth.js';
//import express from 'express';
// const app = express();
// // import swaggerJSDoc from "swagger-jsdoc";
// // import { SwaggerUiOptions } from "swagger-ui-express";

// // //configRoutesFunction(app);

// // const swaggerOptions = {
// //     swaggerDefinition: {
// //         info: {
// //             title: "my Swagger",
// //             description: "NEUCIPHER API",
// //             servers: ["http://localhost:3000"]
// //         }
// //     },
// //     apis: ["app.js"]
// // }
// app.use(express.json());
// const db = await dbConnection();
// startServer()

// app.use('/auth', authFunctions);

//closeConnection();


import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is on!");
  console.log('routes will be running on http://localhost:3000');
});