const express = require('express');
const path = require('path');

//the port we are using
const PORT = process.env.port || 3001;

//instanciates the express function
app = express();

//use to access the public folder
app.use(express.static('public'));

//for the home page of note taking
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

//sets up the webpage with a port of 3001 or the port given
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
