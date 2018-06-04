const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 5000;

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('disconnect', () => {
        console.log('disconnected')
    });

    socket.on('message', (message) => {
        console.log(`message from client ${message}`)
        io.emit('message', {type: 'new-message', text: message})
    });
});

http.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})