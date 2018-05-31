const express = require('express');
const app = express();
const http = require('http');
const PORT = 3000;
const socket = require('socket.io');

app.get('/', (req, res) => {
    res.send('Hello World')
});
app.get('/name', (req, res) => {
    res.send('Hello World name')
});

let server = app.listen(PORT, () => console.log(`Server running at ${PORT}`));
const io = socket(server);
io.sockets.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: 'Hello You!!'
    })
});