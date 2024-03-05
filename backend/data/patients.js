// TODO: Export and implement the following functions in ES6 format

import {patients} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const create = async (newUser
  ) => {
    let newUserToBeAdded = {
      email : newUser.email,
      username : newUser.username,
      password : newUser.password
    };
  
    const patientsCollection = await patients();
    const insertInfo = await patientsCollection.insertOne(newUserToBeAdded);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw ('Error : patients not be added');
    const newId = insertInfo.insertedId.toString();
    const patientAdded = await get(newId);
    return patientAdded;
  };

  export {create}