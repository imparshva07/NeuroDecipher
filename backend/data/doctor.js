// TODO: Export and implement the following functions in ES6 format

import {doctors} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const create = async (Userdata
  ) => {
    let newUserToBeAdded = {
      email : Userdata.email,
      name : Userdata.name,
      password : Userdata.password,
      gender : Userdata.gender,
      contactNumber : Userdata.contactNumber,
      specialty: Userdata.specialty,
      ml: Userdata.ml
    };
  
    const doctorsCollection = await doctors();
    const insertInfo = await doctorsCollection.insertOne(newUserToBeAdded);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw ('Error : doctors not be added');
    const newId = insertInfo.insertedId.toString();
    const doctorAdded = await get(newId);
    return doctorAdded;
  };

  const findEmail = async (email) => {
    try {
        const doctorsCollection = await doctors();
        const doctor = await doctorsCollection.findOne({ email });
        return doctor;
    } catch (error) {
        throw new Error('Error fetching doctor by email: ' + error.message);
    }
};

  const getAllDoctorSpecialty = async () => {
    try {
      const doctorsCollection = await doctors();
      const doctorsSpecialty = await doctorsCollection.distinct("specialty");
      return doctorsSpecialty;
    } catch (error) {
      throw new Error('Error fetching doctor details: ' + error.message);
    }
  };
  
  const findBySpecialty = async (specialty) => {
    try {
      const doctorsCollection = await doctors();
      const doctorsSpec = await doctorsCollection.find({ specialty }).toArray();
      return doctorsSpec;
    } catch (error) {
      throw new Error('Error fetching doctors by specialty: ' + error.message);
    }
  };

  const get = async (id) => {
    const doctorsCollection = await doctors();
    const doctor = await doctorsCollection.findOne({_id: new ObjectId(id)});
    if (doctor=== null) throw ('Error : doctor not found');
    doctor._id = doctor._id.toString();
    return doctor;
  };

  const exportMethods = {create, findEmail, get, getAllDoctorSpecialty, findBySpecialty}

  export default exportMethods;
