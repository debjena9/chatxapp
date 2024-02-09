const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const handleExistingUser = async (field, value) => {
    const userExist = await User.findOne({ [field]: value });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists.');
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields.');
    }

    await handleExistingUser('email', email);
    await handleExistingUser('username', username);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });

    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            msg: 'Registered Successfully.',
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields.');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const maxResults = 10;
    let users = [];

    try {
        const userRecords = await User.find({}).limit(maxResults);
        users = userRecords.map((user) => ({
            _id: user._id,
            username: user.username,
            email: user.email,
        }));
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Unable to fetch users.');
    }
});

const getMe = asyncHandler(async (req, res) => {
    try {
        const userRecord = await User.findOne({ _id: req.user._id });
        const { _id, username, email } = userRecord;

        res.status(200).json({ _id, username, email });
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Unable to fetch user details.');
    }
});

const getUser = asyncHandler(async (req, res) => {
    try {
        const userRecord = await User.findOne({ username: req.params.username });
        if (!userRecord) {
            res.status(404).json({
                message: 'User not found.',
            });
            return;
        }
        const { _id, username, email } = userRecord;

        res.status(200).json({ _id, username, email });
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Unable to fetch user details.');
    }
});

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getMe,
    getUser,
};
