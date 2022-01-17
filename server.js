//Necessary code lines to get express.js started
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const data = require('./db/db.json')

const path = require('path')

app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//Getting the data list and then parsing it into json
app.get('/api/notes', (req, res) => {
    res.json(data)
})

app.listen(PORT, () => {
    console.info(`The server connected to port ${PORT}`);
})