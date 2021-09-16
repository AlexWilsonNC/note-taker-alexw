const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
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
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// default to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, function() {
    console.log(`Server is listening on PORT: http://localhost:${PORT}`);
  });