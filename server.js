const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3009;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './db/db.json'))
);

app.post('/api/notes', (req, res) =>
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        const notes = JSON.parse(data);
        const noteRequest = req.body;
        const newNoteId = notes.length + 1;
        const newNote = {
            title: noteRequest.title,
            text: noteRequest.text,
            id: newNoteId
        };
        notes.push(newNote)
    
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
            res.json('success')
        });
    })
);

app.get('*', (req, res) => res.redirect('/index.html'));

app.listen(PORT, function() {
    console.log(`Server is listening on PORT: http://localhost:${PORT} 📝`);
  });