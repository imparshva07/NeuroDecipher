import {Router} from 'express';
const router = Router();
import {patientData , doctorData} from '../data/index.js';
import axios from 'axios'; 

// router
// .route('/')
// .post(async (req, res) => {
//   return res.send('POST request to http://localhost:3000');
// });

router
.route('/signup')
.post(async (req, res) => {
  try {
    const { name, email, username, gender, contactNumber, password, dob, doctorSpecialty } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
      name : name,
      email : email,
      username : username,
      gender : gender,
      contactNumber: contactNumber,
      password : password,
      dob : dob,
      doctorSpecialty : doctorSpecialty
    };
    await patientData.create(newUser);
    res.status(201).json({ message: 'patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await patientData.findByEmail(email); 
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, '6bf7bb05665c95a51cefd55bc910fde90ded046008a133d26688762a2677d440', { expiresIn: '5h' });
    res.json({ token, userId: user._id, email: user.email, name: user.name });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch patient details using email
router.get('/patient/email/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const patientDetails = await patientData.findByEmail(email);
      res.json(patientDetails);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//Doctor Signup Router
router
.route('/signupdoctor')
.post(async (req, res) => {
  try {
    const { name, email, gender, contactNumber, specialty, password, ml } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);

    let Userdata = {
      name : name,
      email : email,
      gender : gender,
      contactNumber: contactNumber,
      specialty: specialty,
      password : password,
      ml: ml
    };
    await doctorData.create(Userdata);
    res.status(201).json({ message: 'doctor created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logindoctor', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorData.findEmail(email); 
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, '6bf7bb05665c95a51cefd55bc910fde90ded046008a133d26688762a2677d440', { expiresIn: '5h' });
    res.json({ token, userId: user._id, email: user.email, name: user.name }); 

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch doctor details using email
router.get('/doctor/email/:email', async (req, res) => {
  try {
  //  console.log('Fetching doctor data for email:', req.params.email);
    const email = req.params.email;
    const doctorDetails = await doctorData.findEmail(email);
  //  console.log('Doctor details:', doctorDetails);
    res.json(doctorDetails);
  } catch (error) {
    //console.error('Error fetching doctor data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all doctor Speciality
router.get('/doctor/specialty', async (req, res) => {
  try {
    const doctorsSpecialty = await doctorData.getAllDoctorSpecialty();
    res.json(doctorsSpecialty);
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch doctor details by specialty
router.get('/doctor/specialty/:specialty', async (req, res) => {
  try {
    const specialty = req.params.specialty;
    const doctorDetails = await doctorData.findBySpecialty(specialty);
    res.json(doctorDetails);
  } catch (error) {
    console.error('Error fetching doctor details by specialty:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to update patient details with doctorName 
router.put('/patient/email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const updatedPatient = await patientData.updateByEmail(email, updatedData);
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to update patient details with message
router.put('/patient/email/:email/message', async (req, res) => {
  try {
    const email = req.params.email;
    const action = req.body.action.replace(/\s/g, ''); 
    
    const predictedMessage = await axios.post(`http://localhost:3000/send-${action}`, {
    });
    
    const updatedPatient = await patientData.updateByEmail(email, { message: predictedMessage.data.predicted_class[0] });
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch patient details by doctor's name
router.get('/patient/doctorName/:doctorName', async (req, res) => {
  try {
    const doctorName = req.params.doctorName;
    const patientDetails = await patientData.findByDoctorName(doctorName);
    res.json(patientDetails);
  } catch (error) {
    console.error('Error fetching patient details by doctor name:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

// router.post('/signup', async (req, res) => {
//   try {
//     const { email, username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     let newUser = {
//       email : email,
//       username : username,
//       password : hashedPassword
//     };
//     await create(newUser);
//     res.status(201).json({ message: 'patient created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await patient.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
