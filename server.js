//required packages and modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')
const {readFromFile, readAndAppend, writeToFile} = require('./helper/fsUtils')
//the database storing the notes.
const filePath = './db/db.json';

//the port we are using
const PORT = process.env.port || 3001;
//instanciates the express function
app = express();

//middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

//for the home page of note taking
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//to get the notes in db.json
app.get('/api/notes', (req, res) => {
    //use promisify so we can use .then to parse the db.json on to the screen
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//get a specific note that was clicked on
app.get('/api/notes/:title', (req, res) => {
    //use promisify so we can use .then to parse the db.json on to the screen
    const title = req.params.title;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.title === title);
        return result.lenght >0 ? res.json(result) : res.json('No note found');
    });
});


//to save the note currently being worked on
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    // get the data from 
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, filePath);
    }else{
        res.error('Error in adding the Note')
    }
});

//sets up the webpage with a port of 3001 or the port given
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
