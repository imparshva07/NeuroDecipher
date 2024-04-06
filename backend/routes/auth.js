import {Router} from 'express';
const router = Router();
import {patientData} from '../data/index.js';

// router
// .route('/')
// .post(async (req, res) => {
//   return res.send('POST request to http://localhost:3000');
// });

router
.route('/signup')
.post(async (req, res) => {
  try {
    const { name, email, username, gender, contactNumber, password, dob } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
      name : name,
      email : email,
      username : username,
      gender : gender,
      contactNumber: contactNumber,
      password : password,
      dob : dob
    };
    await patientData.create(newUser);
    res.status(201).json({ message: 'patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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


export default router;