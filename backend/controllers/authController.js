const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const register = async (req, res) => {
    try {
        const { name, email, password, dateofjoining, profileinfo } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            try {
                const hashedpassword = await bcrypt.hash(password, 12)
                const user = await User.create({ name, email,password: hashedpassword,dateofjoining,profileinfo });
                
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN });
                console.log(user,token)
                res.status(201).json({ userdata: user ,token:token})
            }
            catch (err) {
                res.status(400).json({ err })
            }
        }
    else {
        res.status(200).json({ err: 'Email Already Registered' });
    }
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login
};