const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require("express-validator");

router.get('/', (req,res)=>{
    res.json([]);
})

router.post('/',[
    body('name','Name must be atleast 3 characters long').isLength({min: 3}),
    body('userName','Username must be atleast 3 characters long').isLength({min: 3}),
    body('password','Password must be at least 8 characters long').isLength({min: 8})
], (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    
    User.create({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => res.json({error: 'please enter a unique value for username'}))
})
module.exports = router