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
import fs from 'fs';
import FormData from 'form-data';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/send-helpme', async (req, res) => {
  try {
    // Read data from a JSON file asynchronously
    fs.readFile('/Users/parshvashah/parshva/Course materials/CS 555/project/CS-SSW-555-Team-6/model/help_me_eeg_data.json', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      //const eegData = JSON.parse(jsonData);
      
      // Send a POST request to FastAPI server
      axios.post('http://localhost:8000/predict-helpme', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Predicted class:', response.data);
        // Handle response data as needed
        res.json(response.data); // Send response back to client
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle error response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/send-hello', async (req, res) => {
  try {
    // Read data from a JSON file asynchronously
    fs.readFile('/Users/parshvashah/parshva/Course materials/CS 555/project/CS-SSW-555-Team-6/model/hello_eeg_data.json', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      //const eegData = JSON.parse(jsonData);
      
      // Send a POST request to FastAPI server
      axios.post('http://localhost:8000/predict-hello', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Predicted class:', response.data);
        // Handle response data as needed
        res.json(response.data); // Send response back to client
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle error response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/send-yes', async (req, res) => {
  try {
    // Read data from a JSON file asynchronously
    fs.readFile('/Users/parshvashah/parshva/Course materials/CS 555/project/CS-SSW-555-Team-6/model/yes_eeg_data.json', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      //const eegData = JSON.parse(jsonData);
      
      // Send a POST request to FastAPI server
      axios.post('http://localhost:8000/predict-yes', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Predicted class:', response.data);
        // Handle response data as needed
        res.json(response.data); // Send response back to client
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle error response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/send-thankyou', async (req, res) => {
  try {
    // Read data from a JSON file asynchronously
    fs.readFile('/Users/parshvashah/parshva/Course materials/CS 555/project/CS-SSW-555-Team-6/model/thank you_eeg_data.json', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      //const eegData = JSON.parse(jsonData);
      
      // Send a POST request to FastAPI server
      axios.post('http://localhost:8000/predict-thankyou', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Predicted class:', response.data);
        // Handle response data as needed
        res.json(response.data); // Send response back to client
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle error response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/send-stop', async (req, res) => {
  try {
    // Read data from a JSON file asynchronously
    fs.readFile('/Users/parshvashah/parshva/Course materials/CS 555/project/CS-SSW-555-Team-6/model/stop_eeg_data.json', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      //const eegData = JSON.parse(jsonData);
      
      // Send a POST request to FastAPI server
      axios.post('http://localhost:8000/predict-stop', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Predicted class:', response.data);
        // Handle response data as needed
        res.json(response.data); // Send response back to client
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle error response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



configRoutes(app);

app.listen(3000, () => {
  console.log("Server is on!");
  console.log('routes will be running on http://localhost:3000');
});