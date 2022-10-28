//required packages and modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')

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

app.get('/api/notes', (req, res) => {
    util.promisify(fs.readFile)('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//sets up the webpage with a port of 3001 or the port given
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
