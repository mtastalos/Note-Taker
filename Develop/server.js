const express = require('express');
const path = require('path')
const fs = require('fs');
const noteArray = require('./db/db')
const uniqid = require('uniqid')

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
    return res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    return res.json(noteArray);
})

app.post('/api/notes', (req, res) => {
    let note = req.body;
    note.id = uniqid();
    noteArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(noteArray), null, 2);
    return res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = req.params.id;
    noteArray.forEach((element, index) => {
        if(element.id === deleteNote){
            noteArray.splice(index,1);
        }
    });
    return res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
