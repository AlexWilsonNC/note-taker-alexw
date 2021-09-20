const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3009;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// grabbing from homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// route to notes.html page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './db/db.json'))
);

app.post('/api/notes', (req, res) =>
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', function(error, res) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(res);
        const noteRequest = req.body;
        const newNoteId = notes.length + 1;
        const newNote = {
            title: noteRequest.title,
            text: noteRequest.text,
            id: newNoteId
        };
        notes.push(newNote), res.json(newNote);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), function(error) {
            if (error) throw error;
        })
    })
);

// default to index.html
app.get('*', (req, res) => res.redirect('public/index.html'));

app.listen(PORT, function() {
    console.log(`Server is listening on PORT: http://localhost:${PORT} 📝`);
  });