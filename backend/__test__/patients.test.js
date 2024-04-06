const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { dbConnection } = require('../config/mongoConnection.js');
const { getPatient } = require('../data/patients.js');

describe('get function', () => {
  let db;

  beforeAll(async () => {
        db = await dbConnection();
    });

  afterAll(async () => {
  });

  it('should return the patient with the given ID', async () => {
    const patientCollection = db.collection('patients');
    const patient = await getPatient("66033f46ab7fcb1100536c6f");
    
    expect(patient).toBeDefined();
    expect(patient._id).toBe("66033f46ab7fcb1100536c6f");
    expect(patient.username).toBe("imparshva07");
  });

  it('should throw an error if patient is not found', async () => {
    const invalidId = '66033f46ab7fcb1100536c6a';

    try {
      await getPatient(invalidId);
    } catch (error) {
      expect(error).toEqual('Error : patient not found');
    }
  });

  it('should throw an error if id is invalid objectId', async () => {
    const invalidId = 'invalidId';
    try {
      await getPatient(invalidId);
    } catch (error) {
      expect(error).toEqual('Error: invalid Object Id');
    }
  });
});
