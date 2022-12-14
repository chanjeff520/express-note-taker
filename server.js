//required packages and modules
const express = require('express');
const path = require('path');
const fs = require('fs');
//the database storing the notes.
const filePath = './db/db.json';

//the port we are using
const PORT = process.env.PORT || 3001;
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
    res.sendFile(path.join(__dirname, filePath));
});

//to save the note currently being worked on
app.post('/api/notes', (req, res) => {
    //gets the db.json from the filepath and then make it into an array/object
    const noteArr = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    //variable for the newNote
    const {title, text} = req.body;
    //creating an element of the db.json array
    const newNote = {
        title,
        text,
        id : (noteArr.length),
    };

    //add newNote to the noteArr, which is also the db.json
    noteArr.push(newNote);

    //writeFile to db.json
    fs.writeFileSync(filePath, JSON.stringify(noteArr));
    //this is the response 
    res.json(noteArr);
});

//to delete notes
app.delete('/api/notes/:id', (req,res) => {
    //get the id from the parameters
    const id = req.params.id;
    //parse the data from note db.json
    let noteArr = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    //use the array funciton filter to get rid of the id that needed to be deleted
    noteArr = noteArr.filter((note) => note.id != id)
    //need to make new id after deleting
    for(let i=0; i<noteArr.length; i++){
        noteArr[i].id = i;
    }

    //write the file to db.json
    fs.writeFileSync(filePath, JSON.stringify(noteArr));
    //this is the response 
    res.json(noteArr);
    
});


//sets up the webpage with a port of 3001 or the port given
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
