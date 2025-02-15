const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
exports.registerUser = async (req, res) => {
    const { email, password, full_name } = req.body; 
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const user = await User.create({ 
            email,
            password_hash,  
            full_name      
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.full_name,  
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Received login data:', req.body);  

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);  

        if (!user) {
            console.log('User not found');  
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare the entered password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            console.log('Invalid credentials');  // Log invalid credentials
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        res.json({
            token: generateToken(user.id),  
            user: {
                _id: user.id,
                name: user.full_name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);  // Log the error
        res.status(500).json({ message: error.message });
    }
};
