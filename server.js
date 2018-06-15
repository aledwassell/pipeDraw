const app = require('express')();
const http = require('http').Server(app);
const PORT = process.env.port || 5000;
const server = app.listen(PORT)
const io = require('socket.io')(http);


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