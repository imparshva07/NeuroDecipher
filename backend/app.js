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
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/predict-node', async (req, res) => {
  try {
      // Send EEG signals to Python server
      const response = await axios.post('http://localhost:5000/predict', {
          eeg_signals: req.body.eeg_signals
      });

      // Receive prediction from Python server
      const prediction = response.data.prediction;

      // Handle prediction as needed
      res.json({ prediction });
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is on!");
  console.log('routes will be running on http://localhost:3000');
});