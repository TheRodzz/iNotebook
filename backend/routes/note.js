const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetch all notes of the logged in user using: get "/api/note/fetchallnotes". login required
router.get('/fetchallnotes',  fetchuser,async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
// ROUTE 2: add a new note using "POST /api/note/addnote". Login required
router.post('/addnote',[
    body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be atleast 3 characters long').isLength({ min: 3 }),
], fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
    // if there are errors, return bad request along with errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const note = new Note({
            title,description,tag, user:req.user.id
        })
        const savedNote=await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router
