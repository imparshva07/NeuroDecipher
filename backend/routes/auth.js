import express from 'express';
import jwt from 'jsonwebtoken';

import {create} from '../data/patients.js'

import {Router} from 'express';
const router = Router();

router.route('/')
.post(async (req, res) => {
  return res.send('POST request to http://localhost:3001');
});

router.route('/signup')
.post(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
      email : email,
      username : username,
      password : hashedPassword
    };
    await create(newUser);
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