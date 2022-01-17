//Necessary code lines to get express.js started
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const path = require('path')

app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => {
    console.info(`The server connected to port ${PORT}`);
})