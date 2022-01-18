//Necessary code lines to get express.js started
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const data = require('./db/db.json');

const path = require('path');
const fs = require('fs');

//A method that will give a random assortment of ids that I can just make every note id a random id
const { randomUUID } = require('crypto');

app.use(express.static('public'));

//Will parse any string or array into json which it needs to use the API. (db.json)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Getting the data list and then parsing it into json
app.route('/api/notes')
    .get((req, res) => {
        res.json(data)
    })
    .post((req, res) => {
        let makeNote = req.body;
        makeNote.id = randomUUID();
        data.push(makeNote);

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(data), err => {
            if (err) throw err;
            res.json(data);
        });
    });

app.listen(PORT, () => {
    console.info(`The server connected to port ${PORT}`);
});