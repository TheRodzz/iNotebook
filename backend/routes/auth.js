const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");

router.get('/', (req, res) => {
    res.json([]);
})

// create a user using: POST "/api/auth/createuser". no login required
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
        user = await User.create({
            name: req.body.name,
            userName: req.body.userName,
            password: req.body.password,
        })
        // .then(user => res.json(user))
        // .catch(err => res.json({error: 'please enter a unique value for username'}))
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
module.exports = router