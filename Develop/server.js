const express = require('express');
const path = require('path')
const fs = require('fs');
const noteArray = require('./db/db')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use Routes
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, './public/index.html'));
// })

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/notes', (req, res) => {
    console.log(noteArray)
    res.json(noteArray);
})

app.post('/api/notes', (req, res) => {
    let note = req.body;
    noteArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(noteArray), null, 2);
    return noteArray;
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
