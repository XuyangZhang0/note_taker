const notes = require('express').Router();
const { readFromFile, readAndAppend, removeFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title: title,
            text: text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Notes added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    console.log("Method called is -- ", req.method);
    removeFromFile(req.params.id, './db/db.json');
})

module.exports = notes;