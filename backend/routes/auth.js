const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");

router.get('/', (req, res) => {
    res.json([]);
})

//ROUTE 1: create a user using: POST "/api/auth/createuser". no login required
router.post('/createuser', [
    body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }),
    body('userName', 'Username must be atleast 3 characters long').isLength({ min: 3 }),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 })
], async (req, res) => {

    const errors = validationResult(req);
    // if there are errors, return bad request along with errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    // check wether a user with same username exists
    try {

        let user = await User.findOne({ userName: req.body.userName });
        if (user) {
            return res.status(400).json({ error: "User with this username already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            userName: req.body.userName,
            password: securePass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: authenticate a user using: POST "/api/auth/login". no login required
router.post('/login', [
    body('userName', 'Username must be atleast 3 characters long').isLength({ min: 3 }),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // input validation
    const errors = validationResult(req);
    // if there are errors, return bad request along with errors
    if (!errors.isEmpty()) {
        return res.status(400).json({});
    }

    const {userName,password} = req.body;
    try {
        // checking if user with given user name exists in db
        let user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({error: "Enter valid login credentials"});
        }

        // checking if given password's hash matches stored hash 
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Enter valid login credentials"});
        }

        // if credentials provided were valid, proceed to send auth token 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: get logged in user's details using "POST /api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router