const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetch all notes of the logged in user using: get "/api/note/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // fetch all notes from db
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
// ROUTE 2: add a new note using "POST /api/note/addnote". Login required
router.post('/addnote', [
    body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be atleast 3 characters long').isLength({ min: 3 }),
], fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    // if there are errors, return bad request along with errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        // create a new note and try to save it in the db
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: update a note using "PUT /api/note/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        // add the new values of the updated fields to a new note object
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // check if note with given id exists and fetch it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // check if the logged in user is the owner of the note fetched above
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        // update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 4: delete a note using "PUT /api/note/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // check if note with given id exists and fetch it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        // check if the logged in user is the owner of the note fetched above

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        // delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.send(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
