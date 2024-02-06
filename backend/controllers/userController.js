const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// @desc Login user
// @route POST /api/users/login
// @access public

const loginUser = (async (req, res, next) => {
    const { phone, password } = await req.body;
    console.log(phone, password);
    if (!phone || !password) {
        return res.status(400).json({ message: "All fields are mandatory!" });
        // throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ phone });

    if (user && await (bcrypt.compare(password, user.password))) {
        // giving access token to the user
        const accessToken = await jwt.sign({
            // Payload : user data attached to the token
            userName: user.userName,
            phone: user.Phone,
            id: user.id
        },
            process.env.ACCESS_TOKEN_SECRET)
        console.log("Logged in successfully");
        // res.status(201).json({ _id: user.id, userName: user.userName });
        return res.status(201).json({ accessToken });
    }

    else {
        return res.status(401).json({ message: "Invalid credentials" });
        // throw new Error('Phone number or password is incorrect!')
    }
})

// @desc Signup user
// @route POST /api/users/signup
// @access public

const signUpUser = (async (req, res, next) => {

    try {

        // destructuring the data
        const { userName, phone, password } = await req.body;
        console.log(userName, phone, password);

        // Checking if the user has entered all the mandatory fields 
        if (!userName || !phone || !password) {
            return res.status(400).json({ message: "All fields are mandatory!" });
            // throw new Error("All fields are mandatory!");
        }

        // Checking if the user is already registered or not
        const match = await User.findOne({ phone });
        if (match) {
            return res.status(400).json({ message: "User is registered already" });
            // throw new Error("User is registered already");
        }
        // creating a new user object
        const newUser = await new User({
            userName, phone, password
        })
        // validating the data
        const validationError = await newUser.validateSync();
        if (validationError) {
            return res.status(400).json({ message: "Invalid phone number or password length is not appropriate (should be greater than 4)" });
        }

        // Password Hashing 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Registering a new user
        const savedUser = await User.create({
            userName, phone, password: hashedPassword
        });

        // console.log(hashedPassword);
        console.log(savedUser.userName, savedUser.phone);

        if (savedUser) {
            res.status(201).json({ _id: savedUser.id, phone: savedUser.phone, message: "User registered successfully" });
        }
        // else {
        //     return res.status(400).json({ message: "Invalid user data" });
        //     // throw new Error("Invalid user data")
        // }
    }
    catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Invalid phone number or password length is not appropriate (should be greater than 4)" });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
    // next();
}
)

// @desc User info
// @route GET /api/users/info
// @access public

const userInfo = async (req, res, next)=>{
    try{
        const {query} = await req.query;
        console.log(query);
        const currUser = await User.findOne({phone: query});
        console.log(currUser.userName);
        const name = await currUser.userName;
        if(currUser)
        {
            return res.json({userName: name});
        }
    }
    catch(err)
    {
        return res.json({error: err})
    }
}


module.exports = { loginUser, signUpUser, userInfo };