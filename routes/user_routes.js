const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User  = require('../models/User');
// const {generateToken} = require('../auth')

router.use(express.json());
  
// Login
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    // controller
    if (!name || !password) {
        console.log(name)
        console.log(password)
        return res.status(400).json({ message: 'Name and password are required' });
    }
    try {
        const user = await User.findOne({ where: { name } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // const token = generateToken(user);
        // res.status(200).json({ token });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Signup
router.post('/signup', async (req, res) => {
    const { name, password } = req.body;
    // controller
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }
    try {
        const existingUser = await User.findOne({ where: { name } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
        // const token = generateToken(newUser);
        // res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
