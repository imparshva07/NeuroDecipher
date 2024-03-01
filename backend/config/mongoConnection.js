import {MongoClient} from 'mongodb';
import {mongoConfig} from './settings.js';

// let _connection = undefined;
// let _db = undefined;

// export const dbConnection = async () => {
//   if (!_connection) {
//     _connection = await MongoClient.connect(mongoConfig.serverUrl);
//     _db = _connection.db(mongoConfig.database);
//   }

//   return _db;
// };

// export const closeConnection = async () => {
//   await _connection.close();
// };


//import {mongoConfig} from '../backend/config/settings.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';


let _connection = undefined;
let _db = undefined;

const app = express();
app.use(cors());

const PORT = 3000;

//start server 
export const startServer = () => {

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

}
// Connect to MongoDB database

export const dbConnection = async () => {
mongoose.connect(
'mongodb+srv://pshah10:5dAUvpyXIkzZYqG1@dev-neucipher-internal.ic3ferq.mongodb.net/?retryWrites=true&w=majority&appName=dev-neucipher-internal'
, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

}

// Listen for connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
});

export const closeConnection = async () => {
  await mongoose.connection.close();
};
