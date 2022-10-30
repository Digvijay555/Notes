const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// api for getnotes of logedIn user
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    const notes = await Note.find({ user: req.user.id })

    res.json(notes)
})

//api for saveNotes of logedIn user
router.post('/savenotes', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter description").isLength({ min: 3 }),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        // check if notes is empty or not
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes)

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// api for update the existing notes of logedIn user

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("NO found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

// api for delete the existing notes of logedIn user

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        
        //find the note to be updated
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("NO found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json( "Successfuly deleted" )
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router